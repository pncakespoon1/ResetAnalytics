export const msToStr = (ms, dp = true) => {
  let deciseconds = Math.floor((ms % 1000) / 100),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)));


  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  if (hours === "00") {
    return minutes + ":" + seconds + (dp ? "." + deciseconds : "")
  } else {
    return hours + ":" + minutes + ":" + seconds + (dp ? "." + deciseconds : "")
  }
}

export const logRound = (value) => {
  const digits = Math.floor(Math.log10(value))
  const pow10 = Math.pow(10, digits)
  const ret = Math.ceil(value / pow10) * pow10
  return ret
}

export const roundToPerc = (fullNum, digits = 2) => Math.round(fullNum * (10 ** digits)) / (10 ** digits)
