export const generateRandom = (min: number, max: number, except?: number): number => {
  let num = Math.floor(Math.random() * max)
  while (num === except) {
    num = generateRandom(min, max)
  }
  return num
}
