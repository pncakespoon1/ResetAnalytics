import { splitIntoSessions, avgTimelines, resetCount, totalPlaytime, nethersPerHour, blindsPerHour } from "../../../public/helpers/dataOperations"

const reader = require("g-sheets-api");

const operations = {tl: avgTimelines, rc: resetCount, tp: totalPlaytime, nph: nethersPerHour, bph: blindsPerHour }

export default function handler(req, res) {
  const readerOptions = {
    apiKey: process.env.SHEETS_API_KEY,
    sheetId: req.query.sheet,
    returnAllResults: false,
    sheetName: 'Raw Data'
  };
  return new Promise(resolve => {
    reader(readerOptions, data => {
      // Check to make sure its a valid sheet
      if (data.length === 0 || !("Break RTA Since Prev" in data[0])) {
        res.status(400).json({success: false})
        return resolve()
      }
      // Do some operations
      const sessionOps = []
      const overallOps = {}
      const sessions = splitIntoSessions(data)
      // sessions.forEach(session => {
      //   const currSessionOps = {}
      //   for (const op in operations) {
      //     currSessionOps[op] = (operations[op](session.entries))
      //   }
      //   sessionOps.push({time: session.time, ops: currSessionOps})
      // })
      for (const op in operations) {
        overallOps[op] = operations[op](data)
      }
      res.status(200).json({success: true, session: sessionOps, overall: overallOps})
    }, err => {
      console.log(err)
      res.status(400).json({success: false})
      return resolve()
    })
  })
}