/**
 * Check if a string
 * @param str
 * @returns
 * This function also provides a way to handle String objects which would fail the typeof check
 * @returns
 * true if the string is a string
 * @example
 * isString("foo") // true
 * isString(1) // false
 * isString(new String("foo") // true
 */
export const isString = (str: any) => {
  return typeof str === 'string' || str instanceof String
}
