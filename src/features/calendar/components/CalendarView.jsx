import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

export default function CalendarView({ todos, view = "month", onViewChange }) {
  const events = todos
    .filter((t) => t.startDate || t.endDate)
    .map((todo) => {
      const start = todo.startDate ? new Date(todo.startDate) : new Date();
      const end = todo.endDate ? new Date(todo.endDate) : start;
      return { id: todo._id, title: todo.text, start, end: end >= start ? end : start };
    });

  return (
    <div className="calendarWrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={onViewChange}
        views={["month", "week", "day"]}
        style={{ height: "100%" }}
      />
    </div>
  );
}
