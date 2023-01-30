const regex = "^[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$"

const isValidEmail = (email: string): boolean => {
  return new RegExp(regex).test(email)
}

export { isValidEmail }
