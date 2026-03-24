/**
 * Gets the margins for the print preview
 */
export const getPrintPageMargins = () => {
  const marginTop = '1rem'
  const marginRight = '1rem'
  const marginBottom = '1rem'
  const marginLeft = '1rem'
  return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`
}
