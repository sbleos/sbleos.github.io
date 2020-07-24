export const getFiscalYear = (date) => {
  const eventDate = new Date(date);
  const benchmark = new Date(`July 1, ${eventDate.getFullYear()}`); // start of new fiscal year in year of the event

  const numMonths = eventDate.getMonth() - benchmark.getMonth() + (12 * (eventDate.getFullYear() - benchmark.getFullYear()));

  const fiscalYear =  numMonths < 0
                      ? `${eventDate.getFullYear()-1}-${eventDate.getFullYear()}`   // event is before benchmark
                      : `${eventDate.getFullYear()}-${eventDate.getFullYear()+1}`   // event is after benchmark

  return fiscalYear;
}

export const generateID = (len) => [...Array(len)].map(_=>(Math.random()*36|0).toString(36)).join``;

/**
 * Generates an array of Date objects of every single day since July 1st of the specified year.
 * @param  {Date} date Earliest date from User.joinDate
 */
export const getDateArray = (date) => {
  var arr = [];
  while (date <= new Date()) {
      arr.push(new Date(date));
      date.setDate(date.getDate() + 1);
  }
  return arr;
}

/**
 * Check if a user is active at a specific date
 * @param  {Date} joinDate    Date joined
 * @param  {String} endYear   Ending fiscal year
 * @param  {Date} date        Date to be checked with
 */
export const isActive = (joinDate, endYear, date) => {
  const endDate = new Date(`June 30, ${endYear}`);

  return joinDate <= date && date <= endDate;
}

