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
      const values = data.map(row => (
        {
          label: row["Username"],
          value: row["SheetId"]
        }
      ))
      values.sort((a, b) => {
        if (a.label > b.label)
          return 1
        if (a.label < b.label)
          return -1
        return 0
      })
      return res.status(200).json({ success: true, data: values })
    })
  })
}