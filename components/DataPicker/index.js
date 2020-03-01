import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
export default props => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <KeyboardDateTimePicker
        className={props.className}
        variant="inline"
        disableToolbar
        margin="normal"
        ampm={false}
        id={props.id}
        label={props.label}
        format="dd/MM/yyyy HH:mm"
        value={props.value}
        onChange={props.onChange}
        KeyboardButtonProps={{ "aria-label": "change date" }}
      />
    </MuiPickersUtilsProvider>
  );
};
