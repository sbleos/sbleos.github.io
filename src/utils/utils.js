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