const reader = require("g-sheets-api");

export default async function handler(req, res) {
  const readerOptions = {
    apiKey: process.env.SHEETS_API_KEY,
    sheetId: process.env.NAME_KEY_SHEET,
    returnAllResults: false,
    sheetName: 'Data'
  };
  return new Promise(resolve => {
    reader(readerOptions, data => {
      return res.status(200).json(data.map(row => (
        {
          name: row["Username"],
          sheet: row["SheetId"]
        }
      )))
    })
  })
}