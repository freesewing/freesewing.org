import React from "react"
import TextField from '@material-ui/core/TextField';
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, search="Search", ...rest }) => (
    <TextField
      variant="outlined"
      fullWidth
      type="text"
      placeholder={search}
      aria-label={search}
      onChange={e => refine(e.target.value)}
      {...rest}
    />
))
