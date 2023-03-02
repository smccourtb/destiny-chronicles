import { isString } from './string'

/**
 * Takes an array of numbers and converts them to a string separated by commas
 * @param components - An array of numbers.
 * @example
 * urlHandling([1,2,3]) // "1,2,3"
 * @see {@link destinyComponents}
 * @returns
 * A string of numbers separated by commas
 */
export const formatQueryParameters = (components: number[]) => {
  return components.map((component) => component.toString()).join(',')
}

/**
 * Checks if the path provided starts with a `/` and applies if needed. Then applies the Bungie domain to the beginning
 * of the path
 * @param path - The path to apply the domain to. Usually what is returned from the API
 * @returns
 * A properly formatted URL with the Bungie domain
 * @example
 * applyBungieDomain("/foo/bar") // https://www.bungie.net/foo/bar
 * applyBungieDomain("foo/bar") // https://www.bungie.net/foo/bar
 */
export const applyBungieDomain = (path: string) => {
  console.log('applyBungieDomain', path)
  // check in path is a string
  if (!isString(path)) throw TypeError('Path is not a string')
  // check if the path starts with a `/`
  const separator = path.startsWith('/') ? '' : '/'
  // return the path with the domain and separator
  return `https://www.bungie.net${separator}${path}`
}
