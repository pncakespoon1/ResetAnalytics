export const msToStr = (ms, keepMs=false) => {
  let milliseconds = Math.floor((ms % 1000) / 100),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)));

  if (milliseconds >= 5) {
    seconds = (seconds + 1) % 60
    if (seconds === 0) {
      minutes = (minutes + 1) % 60
      if (minutes === 0)
        hours += 1
    }
  }

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  let ret =  hours + ":" + minutes + ":" + seconds
  if (keepMs) {
    ret += "." + milliseconds
  }
  return ret
}

export const roundToPerc = (fullNum, digits=2) => Math.round(fullNum * (10**digits)) / (10**digits)

export const processLinePlotData = (data, step) => {
  const netherDistData = []
  const sortedData = [...data].sort((a, b) => a - b);
  const start = sortedData[0]
  const end = sortedData[Math.trunc(sortedData.length * 0.98)]
  const dataRange = Array.from(Array(Math.ceil((end - start) / step)).keys(), (i) => start + i * step)
  dataRange.forEach((num, idx) => {
    const index = sortedData.findIndex((element) => element >= num)
    const count1 = index !== -1 ? index : sortedData.length
    netherDistData.push({time: num, count: count1})
  })
  return netherDistData
}