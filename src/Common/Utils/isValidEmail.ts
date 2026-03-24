/**
 * Checks if there is a valid/invalid email
 * Can't have spaces
 * Needs an @ character
 * Needs a . after the @ character
 * Need at lease one characte after each symbol
 */
export const isValidEmail = (email: string) => {
  const atIndex = email.indexOf('@')
  if (atIndex === -1) {
    return false
  }

  const afterAtEmail = email.substring(atIndex + 1)
  if (afterAtEmail.length === 0) {
    return false
  }

  const dotIndex = afterAtEmail.indexOf('.')
  if (dotIndex < 1) {
    return false
  }

  return true
}
