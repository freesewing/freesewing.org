import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import { info } from '@freesewing/pattern-info'
import Chip from '@material-ui/core/Chip'
import Logo from '@freesewing/components/Logo'

const PatternFilter = (props) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({
    department: [],
    type: [],
    difficulty: [],
  })

  const uniqueArray = (array) => {
    return array.filter(function (value, index, self) {
      return self.indexOf(value) === index
    })
  }
  const resetFilter = () => {
    setSearch('')
    let clear = {
      department: [],
      type: [],
      difficulty: [],
    }
    setFilter(clear)
    props.applyFilter(filteredPatternList(clear, ''))
  }

  const searchUpdate = (evt) => {
    let value = evt.target.value
    setSearch(value)
    props.applyFilter(filteredPatternList(filter, value))
  }

  const toggle = (type, item) => {
    let f = Object.assign({}, filter)
    if (type === 'difficulty') {
      f.difficulty = [1, 2, 3, 4, 5].filter((dif) => {
        return dif <= item
      })
    } else {
      if (f[type].indexOf(item) === -1) f[type] = [item]
      else f[type] = []
    }
    setFilter(f, props.applyFilter(filteredPatternList(f, search)))
  }

  const isSelected = (type, value) => {
    if (typeof filter[type] === 'undefined') return false
    if (filter[type].indexOf(value) === -1) return false
    return true
  }

  const filteredPatternList = (filtered, searched) => {
    let patterns = Object.assign({}, info)
    if (searched !== '') {
      for (let pattern in patterns) {
        if (pattern.indexOf(searched.toLowerCase()) === -1) {
          delete patterns[pattern]
        }
      }
    }
    if (filtered.department.length > 0) {
      for (let pattern in patterns) {
        let seen = false
        for (let department of filtered.department) {
          if (patterns[pattern].department === department) seen = true
        }
        if (!seen) delete patterns[pattern]
      }
    }
    if (filtered.type.length > 0) {
      for (let pattern in patterns) {
        let seen = false
        for (let t of filtered.type) {
          if (patterns[pattern].type === t) seen = true
        }
        if (!seen) delete patterns[pattern]
      }
    }
    if (filtered.difficulty.length > 0) {
      const maxDifficulty = Math.max(...filtered.difficulty)

      for (let pattern in patterns) {
        if (patterns[pattern].difficulty > maxDifficulty) delete patterns[pattern]
      }
    }
    return Object.keys(patterns)
  }

  const filterTypes = {
    type: [],
    department: [],
  }

  for (let p in info) {
    for (let f in filterTypes) {
      if (['difficulty'].includes(f)) {
        if (typeof info[p][f] === 'string') filterTypes[f].push(info[p][f])
        else {
          for (let tag of info[p][f]) filterTypes[f].push(tag)
        }
      } else filterTypes[f].push(info[p][f])
    }
  }

  for (let f in filterTypes) {
    filterTypes[f] = uniqueArray(filterTypes[f])
  }

  filterTypes.difficulty = [1, 2, 3, 4, 5]

  const item = {
    display: 'inline',
    padding: '0.25rem',
  }
  const styles = {
    item: {
      ...item,
    },
    key: {
      ...item,
    },
    list: {
      margin: '1rem 0',
      padding: 0,
      listStyleType: 'none',
    },
    listTitle: {
      display: 'inline',
      fontFamily: 'Roboto Condensed',
      fontWeight: 'bold',
    },
    star: {
      margin: '4px 2px 0',
      display: 'inline-block',
    },
  }

  return (
    <div>
      <form>
        <TextField
          id="search-filter"
          fullWidth={true}
          label={props.app.translate('app.name')}
          margin="normal"
          variant="outlined"
          value={search}
          type="text"
          onChange={searchUpdate}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      {Object.keys(filterTypes).map((type) => {
        return (
          <ul style={styles.list} key={type}>
            <li style={styles.key}>
              <span style={styles.listTitle}>
                <FormattedMessage id={'filter.' + type} />:
              </span>
            </li>
            {filterTypes[type].map((value, index) => {
              const filterLabel = () => {
                if (['code', 'design'].includes(type)) {
                  return value
                } else if (type == 'difficulty') {
                  const difficulty = []
                  for (let i = 1; i <= value; i++)
                    difficulty.push(
                      <span style={styles.star}>
                        <Logo size="16" />
                      </span>
                    )
                  return difficulty
                } else {
                  {
                    return <FormattedMessage id={'filter.' + value} />
                  }
                }
              }

              return (
                <li key={type + value} onClick={() => toggle(type, value)} style={styles.item}>
                  <Chip
                    color="primary"
                    className={'chip-' + type}
                    label={filterLabel()}
                    size="small"
                    variant={isSelected(type, value) ? 'default' : 'outlined'}
                    clickable={true}
                  />
                </li>
              )
            })}
          </ul>
        )
      })}
      <p>
        <Button color="primary" variant="outlined" onClick={resetFilter}>
          <FormattedMessage id="filter.resetFilter" />
        </Button>
      </p>
    </div>
  )
}

export default PatternFilter
