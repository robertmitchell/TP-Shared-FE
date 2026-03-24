/**
 * Returns whether the device is desktop based on the screen size
 */
export const getIsDesktop = () => {
  const screenWidth = window.innerWidth
  const mobileWidthThreshold = 1024
  return screenWidth >= mobileWidthThreshold
}
