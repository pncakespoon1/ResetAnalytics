export const fetchJson = () => {
  return fetch(`${process.env.JSON_API_ENDPOINT}/b/${process.env.JSON_BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": process.env.JSON_KEY
    }
  })
}


export const checkNameInJson = name => {
  return fetchJson()
    .then(res => res.json())
    .then(res => {
      return ({ sheetId: name in res.record ? res.record[name]["1.16"] : "" })
    })
}