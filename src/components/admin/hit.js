import React, { useRef, useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const SearchHit = props => {
  const [expand, setExpand] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const anchorRef = useRef(null)

  const handleAction = option => {
    if (option.slice(0,1) === 't') {
      props.app.backend.adminSetPatronStatus({handle: props.user.handle, patron: option.slice(1)}, props.search)
    }
    else if (option === 'imp') {
      props.app.backend.adminImpersonate({handle: props.user.handle})
    }
    else if (option === 'uf') {
      props.app.backend.adminUnfreeze({handle: props.user.handle}, props.search)
    }
    else if (option === 'admin') {
      props.app.backend.adminSetRole({handle: props.user.handle, role: 'admin'}, props.search)
    }
    else if (option === 'user') {
      props.app.backend.adminSetRole({handle: props.user.handle, role: 'user'}, props.search)
    }
  }

  const options = {
    t0: {
      label: 'No patron',
      color: 'danger'
    },
    t2: {
      label: 'Patron: 2€',
      color: 'accent'
    },
    t4: {
      label: 'Patron: 4€',
      color: 'accent'
    },
    t8: {
      label: 'Patron: 8€',
      color: 'accent'
    },
    uf: {
      label: 'Unfreeze account',
      color: 'success'
    },
    admin: {
      label: 'Assign admin role',
      color: 'info'
    },
    user: {
      label: 'Remove admin role',
      color: 'warning'
    },
  };

  delete options['t'+props.user.patron]
  if (props.user.role === 'admin') delete options.admin
  else delete options.user
  if (props.user.status !== 'frozen') delete options.uf

  const styles = {
    wrapper: {
      margin: '2rem auto',
      borderBottom: "1px solid #666"
    },
    avatar: {
      width: '150px',
      height: '150px',
      float: 'left',
      margin: '0 1rem 1rem 0'
    },
    buttons: {
      textAlign: 'center'
    },
    button: {
      margin: '0.5rem'
    }
  }

  return (
    <div style={styles.wrapper}>
      <img src={props.user.pictureUris.m} alt="avatar" style={styles.avatar} />
      <h5>{props.user.username} ({props.user.handle})</h5>
      <ul>
        <li>Email: {props.user.email}</li>
        <li>Login: {props.user.time.login}</li>
        <li>Patron: {props.user.patron}</li>
      </ul>
      <p style={{textAlign: 'right'}}>
        <Button size="large" onClick={() => setExpand(!expand)} variant="outlined" color="primary">
          { expand ? 'Collapse' : 'Expand' }
        </Button>
        <Button size="large" style={styles.button} onClick={() => handleAction('imp')} variant="contained" color="primary">Impersonate</Button>
      </p>
    { expand && (
      <>
      <div style={styles.buttons}>
      { Object.keys(options).map( option => (
        <Button size="large" key={option} style={styles.button} onClick={() => handleAction(option)} variant="contained" color="primary" className={options[option].color}>{options[option].label}</Button>
      ))}
      </div>
      <div className="gatsby-highlight">
        <pre className="language-json">
          <code className="language-json">
            {JSON.stringify(props.user, null, 2)}
          </code>
        </pre>
      </div>
      </>
    )}
    </div>
  )

}

export default SearchHit
