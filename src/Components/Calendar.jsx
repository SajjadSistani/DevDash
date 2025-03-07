import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/fa";

const Calendar = ({ theme, languageId }) => {
  dayjs.locale(languageId === 1 ? "fa" : "en");

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs()}
          readOnly
          sx={{
            "& .MuiPickersDay-root": {
              color: theme === "light" ? "black" : "white",
            },
            "& .MuiPickersCalendarHeader-label": {
              color: theme === "light" ? "black" : "white",
            },
            "& .MuiPickersCalendarHeader-switchViewButton": {
              color: theme === "light" ? "black" : "white",
            },
            "& .MuiPickersCalendarHeader-switchViewIcon": {
              color: theme === "light" ? "black" : "white",
            },
            "& .MuiPickersCalendarHeader-root": {
              direction: languageId === 1 ? "rtl" : "ltr",
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default Calendar;
