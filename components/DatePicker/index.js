import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
export default props => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <KeyboardDatePicker
        autoOk
        minDate={props.min}
        maxdate={props.max}
        className={props.className}
        variant="inline"
        disableToolbar
        margin="normal"
        label={props.label}
        format="dd/MM/yyyy"
        value={props.value}
        onChange={props.onChange}
      />
    </MuiPickersUtilsProvider>
  );
};
