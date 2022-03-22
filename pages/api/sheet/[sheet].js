import { splitIntoSessions, avgTimelines, resetCount } from "../../../public/helpers/dataOperations"

const reader = require("g-sheets-api");

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
      const sessions = splitIntoSessions(data)
      sessions.forEach(session => console.log(resetCount(session.entries)))
      console.log(resetCount(data))
      res.status(200).json({success: true})
    }, err => {
      console.log(err)
      res.status(400).json({success: false})
      return resolve()
    })
  })
}