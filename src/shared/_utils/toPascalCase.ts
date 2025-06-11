const toPascalCase = (value: string) => {
  const valueList = value.split(/[-_\s]+/) // 구분자: 하이픈, 언더스코어, 공백

  let result = ''

  valueList.forEach((v) => {
    result += v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
  })

  return result
}

export default toPascalCase
