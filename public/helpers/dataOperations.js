// Wants:
// Nethers per hour
// Total Playtime
// Graph session stats over time 

const timelines = ["Wood", "Iron Pickaxe", "Nether", "Bastion", "Fortress", "Nether Exit", "Stronghold", "End"]

const hmsToMs = (h, m, s) => h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000

// Reset count
export const resetCount = data => data.reduce((total, curr) => {
  return total + parseInt(curr["Wall Resets Since Prev"]) + parseInt(curr["Played Since Prev"]) + 1
}, 0)

// Averages for all timeline stats
export const avgTimelines = data => {
  const currTimeline = {}
  // Initalize 
  data.forEach(item => {
    timelines.forEach(tItem => {
      if (item[tItem].length > 0) {
        if (!currTimeline.hasOwnProperty(tItem))
          currTimeline[tItem] = {total: 0, sum: 0}
        const [h, m, s] = item[tItem].split(":")
        currTimeline[tItem].total += 1
        currTimeline[tItem].sum += item[tItem].length > 0 ? hmsToMs(h, m, s) : 0
      }
    })
  })
  // Average out all the data
  const finalTimeline = {}
  timelines.forEach(tItem => {
    if (!currTimeline.hasOwnProperty(tItem))
      finalTimeline[tItem] = 0
    else
      finalTimeline[tItem] = currTimeline[tItem].sum / currTimeline[tItem].total
  })
  return finalTimeline
}

// Session stats based off if time difference > like 1hr
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