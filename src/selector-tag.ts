import {
  sanitizeSelectorItem
} from './utilities-selectors'
import {CssSelector} from './types'

/**
 * Get tag selector for an element.
 */
export function getTagSelector (elements: Element[]): Array<CssSelector> {
  const selectors = [...new Set(elements.map((element) => {
    return sanitizeSelectorItem(element.tagName.toLowerCase())
  }))]
  return (selectors.length === 0 || selectors.length > 1) ? [] : [selectors[0]]
}
