const reader = require("g-sheets-api");

export default function handler(req, res) {
  const readerOptions = {
    apiKey: process.env.SHEETS_API_KEY,
    sheetId: req.query.sheet,
    returnAllResults: false,
    sheetName: 'Raw Data'
  };
  return new Promise(resolve => {
    reader(readerOptions, gRes => {
      // Check to make sure its a valid sheet
      if (gRes.length === 0 && !("Break RTA Since Prev" in gRes[0])) {
        res.status(400).json({success: false})
        return resolve()
      }
      // Do some backend compiling
      res.status(200).json({success: true})
    }, err => {
      res.status(400).json({success: false})
      return resolve()
    })
  })
}