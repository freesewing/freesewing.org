import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '../avatar'

const SearchHit = (props) => {
  const [expand, setExpand] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [tier, setTier] = useState(props.user.patron || 0)
  const [role, setRole] = useState(props.user.role)
  const [frozen, setFrozen] = useState(props.user.status === 'frozen' ? true : false)

  const handleAction = (option) => {
    if (option.slice(0, 1) === 't') {
      props.app.adminSetPatronStatus(props.user.handle, option.slice(1))
      setTier(option.slice(1))
    } else if (option === 'imp') {
      props.app.adminImpersonate(props.user.handle)
    } else if (option === 'uf') {
      props.app.adminUnfreeze(props.user.handle)
      setFrozen(false)
    } else if (option === 'admin') {
      props.app.adminSetRole(props.user.handle, 'admin')
      setRole('admin')
    } else if (option === 'user') {
      props.app.adminSetRole(props.user.handle, 'user')
      setRole('user')
    }
  }

  const options = {
    t0: {
      label: 'No patron',
      color: 'danger',
    },
    t2: {
      label: 'Patron: 2€',
      color: 'accent',
    },
    t4: {
      label: 'Patron: 4€',
      color: 'accent',
    },
    t8: {
      label: 'Patron: 8€',
      color: 'accent',
    },
    uf: {
      label: 'Unfreeze account',
      color: 'success',
    },
    admin: {
      label: 'Assign admin role',
      color: 'info',
    },
    user: {
      label: 'Remove admin role',
      color: 'warning',
    },
  }

  delete options['t' + tier]
  if (role === 'admin') delete options.admin
  else delete options.user
  if (!frozen) delete options.uf

  const styles = {
    wrapper: {
      margin: '2rem 0',
      borderBottom: '1px solid #666',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    data: {
      flexGrow: 2,
      textAlign: 'left',
      padding: '0 1rem',
    },
    buttons: {
      textAlign: 'center',
    },
    button: {
      margin: '0.5rem',
    },
    heading: {
      margin: 0,
    },
    json: {
      width: '100%',
    },
  }

  return (
    <div style={styles.wrapper}>
      <Avatar data={props.user} alt="avatar" />
      <div style={styles.data}>
        <h5 style={styles.heading}>
          {props.user.username} ({props.user.handle})
        </h5>
        <ul>
          <li>
            <b>Email</b>: {props.user.email}
          </li>
          <li>
            <b>Login</b>: {props.user.time ? props.user.time.login : 'never'}
          </li>
          <li>
            <b>Patron</b>: {tier}
          </li>
        </ul>
      </div>
      <p style={{ textAlign: 'right' }}>
        <Button size="large" onClick={() => setExpand(!expand)} variant="outlined" color="primary">
          {expand ? 'Collapse' : 'Expand'}
        </Button>
        <Button
          size="large"
          style={styles.button}
          onClick={() => handleAction('imp')}
          variant="contained"
          color="primary"
        >
          Impersonate
        </Button>
      </p>
      {expand && (
        <>
          <div style={styles.buttons}>
            {Object.keys(options).map((option) => (
              <Button
                size="large"
                key={option}
                style={styles.button}
                onClick={() => handleAction(option)}
                variant="contained"
                color="primary"
                className={options[option].color}
              >
                {options[option].label}
              </Button>
            ))}
          </div>
          <div style={styles.json}>
            <div className="gatsby-highlight">
              <pre className="language-json">
                <code className="language-json">{JSON.stringify(props.user, null, 2)}</code>
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchHit
