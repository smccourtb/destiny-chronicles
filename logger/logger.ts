let debug = false

/**
 * @description master flag to turn off logging to console
 * @param value
 */
export const setDebug = (value: boolean) => {
  debug = process.env.DEBUG === 'true' || value
}

export const log = (...args: any[]) => {
  debug && console.log(...args)
}

export const logWarn = (...args: any[]) => {
  debug && console.warn(...args)
}

export const logError = (...args: any[]) => {
  debug && console.error(...args)
}

export const logInfo = (...args: any[]) => {
  debug && console.info(...args)
}

export const logDebug = (...args: any[]) => {
  debug && console.debug(...args)
}

export const logTable = (...args: any[]) => {
  debug && console.table(...args)
}
