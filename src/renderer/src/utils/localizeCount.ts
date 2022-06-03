/* eslint-disable no-nested-ternary */
const localizeCount = (str: string, count: number, endings: string[]): string =>
  count % 10 === 1 && count % 100 !== 11
    ? str + endings[0]
    : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)
    ? str + endings[1]
    : str + endings[2]

export default localizeCount
