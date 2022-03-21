import { checkNameInJson } from "../../../public/helpers/fetchFromJson"

export default async function handler(req, res) {
  const nameData = await checkNameInJson(req.query.name)
  res.status(nameData.sheetId.length > 0 ? 200 : 400).json(nameData)
}
