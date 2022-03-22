// Wants:
// Averages for all timeline stats
// Nethers per hour
// Reset count
// Total Playtime
// Session stats based off if time difference > like 1hr
// Graph session stats over time 

export const splitIntoSessions = data => {
  const sessions = []
  let first = true;
  let prevTime = null;
  data.forEach(item => {
    if (!first) {
      let currTime = (new Date(item["Date and Time"])).getTime()
      // If there was more than 1hr of gap, start a new session
      if (prevTime - currTime > (1000 * 60 * 60))
        sessions.push({time: prevTime, entries: [item]})
      else
        sessions[sessions.length - 1].entries.push(item)
      prevTime = currTime
    } else {
      prevTime = (new Date(item["Date and Time"])).getTime()
      sessions.push({time: prevTime, entries: [item]})
      first = false
    }
  })
  return sessions
}