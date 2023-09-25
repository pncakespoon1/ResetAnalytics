import { lbOps } from "../../../public/helpers/sub10lbOperations";

const reader = require("g-sheets-api");

export default async function handler(req, res) {
    const readerOptions = {
      apiKey: process.env.SHEETS_API_KEY,
      sheetId: "10LgCMJ7gLs75jyEfuyrPExl2izMviEetwA4APfkp4Hk",
      returnAllResults: false,
      sheetName: 'data'
    };
    return new Promise(resolve => {
      reader(readerOptions, data => {
        return res.status(200).json({ success: true, data: lbOps(data) })
      })
    })
  }