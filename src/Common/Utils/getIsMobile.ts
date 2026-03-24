/**
 * Returns whether the device is mobile based on the screen size
 */
export const getIsMobile = () => {
  const screenWidth = window.innerWidth
  const mobileWidthThreshold = 640
  return screenWidth < mobileWidthThreshold
}
