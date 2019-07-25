import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { info } from "@freesewing/pattern-info";
import Chip from '@material-ui/core/Chip';

const PatternFilter = props => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    department: [],
    type: [],
    tags: []
  });

  const closeFilter = () => {
    resetFilter();
    props.closeFilter();
  }

  const uniqueArray = array => {
    return array.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
  };
  const resetFilter = () => {
    setSearch("");
    let clear = {
      department: [],
      type: [],
      tags: []
    }
    setFilter(clear);
    props.applyFilter(filteredPatternList(clear, ""));
  };

  const searchUpdate = evt => {
    let value = evt.target.value;
    setSearch(value);
    props.applyFilter(filteredPatternList(filter, value));
  };

  const toggle = (type, item) => {
    let list = [];
    let f = Object.assign({}, filter);
    if (typeof f[type] === "undefined") list.push(item);
    else {
      list = f[type];
      let pos = filter[type].indexOf(item);
      if (pos === -1) list.push(item);
      else {
        if (list.length === 1) list = [];
        else list.splice(pos, 1);
      }
    }
    f[type] = uniqueArray(list);
    setFilter(f, props.applyFilter(filteredPatternList(f, search)));
  };

  const isSelected = (type, value) => {
    if (typeof filter[type] === "undefined") return false;
    if (filter[type].indexOf(value) === -1) return false;
    return true;
  }

  const filteredPatternList = (filtered, searched) => {
    let patterns = Object.assign({}, info);
    if (searched !== "") {
      for (let pattern in patterns) {
        if (pattern.indexOf(searched.toLowerCase()) === -1) {
          delete patterns[pattern];
        }
      }
    }
    if (filtered.department.length > 0) {
      for (let pattern in patterns) {
        let seen = false;
        for (let department of filtered.department) {
          if (patterns[pattern].department === department) seen = true;
        }
        if (!seen) delete patterns[pattern];
      }
    }
    if (filtered.type.length > 0) {
      for (let pattern in patterns) {
        let seen = false;
        for (let t of filtered.type) {
          if (patterns[pattern].type === t) seen = true;
        }
        if (!seen) delete patterns[pattern];
      }
    }
    if (filtered.tags.length > 0) {
      for (let pattern in patterns) {
        for (let t of filtered.tags) {
          if (patterns[pattern].tags.indexOf(t) === -1) {
            delete patterns[pattern];
            break;
          }
        }
      }
    }
    return Object.keys(patterns);
  }

  const filterTypes = {
    department: [],
    type: [],
    tags: []
  };

  for (let p in info) {
    for (let f in filterTypes) {
      if (f === "tags") {
        for (let tag of info[p][f]) filterTypes.tags.push(tag);
      }
      else filterTypes[f].push(info[p][f]);
    }
  }

  for (let f in filterTypes) {
    filterTypes[f] = uniqueArray(filterTypes[f]);
  }

  const item = {
    display: "inline",
    padding: "0.25rem",
  }
  const styles = {
    item: {
      ...item,
    },
    key: {
      ...item,
    },
    list: {
      margin: "1rem 0",
      padding: 0,
      listStyleType: "none",
    },
    listTitle: {
      display: "inline"
    }
  }

  return (
    <div>
      <form>
        <TextField
          id="search-filter"
          fullWidth={true}
          label={props.app.frontend.intl.formatMessage({ id: "app.name" })}
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
            )
          }}
        />
      </form>
      {Object.keys(filterTypes).map(type => {
        return (
          <ul style={styles.list}>
            <li style={styles.key}>
              <h6 style={styles.listTitle}><FormattedMessage id={"filter."+type+".title"} />:</h6>
            </li>
            {filterTypes[type].map((value, index) => {
              return (
                <li
                  key={type+value}
                  onClick={() => toggle(type, value)}
                  style={styles.item}
                >
                  <Chip
                    color="primary"
                    label={<FormattedMessage id={"filter."+type+"." + value}/>}
                    size="small"
                    variant={isSelected(type, value) ? "default" : "outlined"}
                    clickable={true}
                  />
                </li>
              );
            })}
          </ul>
        )
      })}
      <p style={{textAlign: "right"}}>
        <Button
          color="primary"
          variant="contained"
          onClick={resetFilter}
        >
          <FormattedMessage id="filter.resetFilter" />
        </Button>
        <Button
          style={{marginLeft: "0.5rem"}}
          color="primary"
          variant="outlined"
          onClick={closeFilter}
        >
          <FormattedMessage id="app.close" />
        </Button>
      </p>
    </div>
  );
}

PatternFilter.propTypes = {
  langauge: PropTypes.string
};

export default PatternFilter;
