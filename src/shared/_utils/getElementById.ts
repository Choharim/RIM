const isBrowser = () => {
  return typeof window !== 'undefined'
}

const getElementById = (id: string) => {
  if (!isBrowser()) return

  return document.getElementById(id)
}

export default getElementById
