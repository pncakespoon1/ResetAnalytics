const reader = require("g-sheets-api");

export default async function handler(req, res) {
  const name = req.query.name.toLowerCase()
  const readerOptions = {
    apiKey: process.env.SHEETS_API_KEY,
    sheetId: process.env.NAME_KEY_SHEET,
    returnAllResults: false,
    sheetName: 'Data'
  };
  return new Promise(resolve => {
    reader(readerOptions, data => {
      const userRow = data.filter(row => row["Username"] === name)
      console.log(userRow)
      if (userRow.length != 1) {
        res.status(404).json({success: false})
        return resolve()
      } else {
        res.status(200).json({success: true, sheetId: userRow[0]["SheetId"]})
      }
    })
  })
}
