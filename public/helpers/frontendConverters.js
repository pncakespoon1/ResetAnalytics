export const msToStr = (ms) => {
  let deciseconds = Math.round((ms % 1000) / 100),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)));


  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  let ret =  hours + ":" + minutes + ":" + seconds + "." + deciseconds
  return ret
}

export const roundToPerc = (fullNum, digits=2) => Math.round(fullNum * (10**digits)) / (10**digits)
