import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/list/main.css';


const Calendar = props => (
  <div style={{height: "30%",width: "50%"}} className="container-fluid">
    <FullCalendar 
                  header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,listWeek"
                  }}
                  defaultView="dayGridMonth" 
                  plugins={[ dayGridPlugin, listPlugin, googleCalendarPlugin ]} 


                  googleCalendarApiKey: "AIzaSyB4QKxS21T2sfo2nDGtdrrWkuVCZUJqoCs"
                  events: {googleCalendarId: "gb0ph7kb3k9g37t2f0ckvobeak@group.calendar.google.com"} 


    />
  </div>
)


export default Calendar;
// googleCalendarApiKey: "AIzaSyB4QKxS21T2sfo2nDGtdrrWkuVCZUJqoCs"
// events: {googleCalendarId: "gb0ph7kb3k9g37t2f0ckvobeak@group.calendar.google.com"} 