let id = 0
let events = [
  {date: '2017-07-28', title: 'Some event 1', class: 'bright'},
  {date: '2017-07-30', title: 'Some event 2', class: 'bright'},
  {date: '2017-08-01', time: '12:00', title: 'Some event 3', class: 'smooth'},
  {date: '2017-08-01', time: '12:30', title: 'Some event 4', class: 'smooth'},
  {date: '2017-08-02', time: '14:00', title: 'Some event with long description', class: 'smooth'},
  {date: '2017-08-02', title: 'Some event 42', class: 'bright'},
  {date: '2017-08-03', time: '16:00', title: 'Some event 5', class: 'smooth'},
  {date: '2017-08-04', time: '11:00', title: 'Some event 6', class: 'smooth'},
  {date: '2017-08-16', title: 'Some event 7', class: 'bright'},
  {date: '2017-08-18', time: '17:00', title: 'Some event 8', class: 'smooth'},
  {date: '2017-08-23', title: 'Some event 9', class: 'bright'},
  {date: '2017-09-01', title: 'Some event next month 1', class: 'bright'},
  {date: '2017-09-01', time: '11:00', title: 'Some event next month 2', class: 'smooth'},
  {date: '2017-09-03', time: '11:00', title: 'Some event next month 3', class: 'smooth'},
].map((event) => {
  event.id = id++
  return event
})

export default events
