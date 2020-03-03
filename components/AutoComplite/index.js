import React, { useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
export default props => {
  useEffect(() => {
    props.getDataFromServer()
  }, []);
  return (
    <Autocomplete
      options={props.options}
      getOptionLabel={props.getOptionLabel}
      debug
      onChange={props.onChange}
      renderInput={params => (
        <TextField
          {...params}
          className={props.className}
          id="placeCommit"
          label="Место совершения"
          value={props.value}
        />
      )}
    />
  );
};
