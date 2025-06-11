const convertHEXToRGB = (hex: string) => {
  let hexCode = hex
  if (hexCode.startsWith('#')) {
    hexCode = hexCode.split('').slice(1).join('')
  }

  const rgbHex = hexCode.match(/.{1,2}/g)

  if (hexCode.length !== 6 || !rgbHex) {
    console.error('HEX 형식이 아닙니다.')
    return
  }

  const rgb = Array.from({ length: 3 }, (_, i) => parseInt(rgbHex[i], 16)).join(
    ','
  )

  return rgb
}

export default convertHEXToRGB
