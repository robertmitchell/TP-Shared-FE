/**
 * Scroll to an element with a specified ID
 */
export const scrollToElementById = (id: string) => {
  const targetDiv = document.getElementById(id)
  if (targetDiv) {
    targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
