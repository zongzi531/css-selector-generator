import {sanitizeSelectorItem} from './utilities-selectors'
import {convertMatchListToRegExp, getIntersection} from './utilities-data'
import {CssSelector} from './types'

// List of attributes to be ignored. These are handled by different selector types.
export const ATTRIBUTE_BLACKLIST = convertMatchListToRegExp([
  'class',
  'id',
  // Angular attributes
  'ng-*'
])

/**
 * Get simplified attribute selector for an element.
 */
export function attributeNodeToSimplifiedSelector ({
  nodeName
}: Node): CssSelector {
  return `[${nodeName}]`
}

/**
 * Get attribute selector for an element.
 */
export function attributeNodeToSelector ({
  nodeName,
  nodeValue
}: Node): CssSelector {
  return `[${nodeName}='${sanitizeSelectorItem(nodeValue)}']`
}

/**
 * Checks whether attribute should be used as a selector.
 */
export function isValidAttributeNode ({nodeName}: Node): boolean {
  return !ATTRIBUTE_BLACKLIST.test(nodeName)
}

/**
 * Get attribute selectors for an element.
 */
export function getElementAttributeSelectors (element: Element): CssSelector[] {
  const validAttributes = Array.from(element.attributes)
    .filter(isValidAttributeNode)
  return [
    ...validAttributes.map(attributeNodeToSimplifiedSelector),
    ...validAttributes.map(attributeNodeToSelector)
  ]

}

/**
 * Get attribute selectors matching all elements.
 */
export function getAttributeSelectors (elements: Element[]): CssSelector[] {
  const elementSelectors = elements.map(getElementAttributeSelectors)
  return getIntersection(elementSelectors)
}
