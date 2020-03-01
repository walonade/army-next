import React, { useState, useCallback } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
export default props => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        className={props.className}
        margin="normal"
        variant="inline"
        disableToolbar
        id="time-picker"
        ampm={false}
        label="Время"
        value={props.value}
        onChange={props.onChange}
        KeyboardButtonProps={{ "aria-label": "change time" }}
      />
    </MuiPickersUtilsProvider>
  );
};
