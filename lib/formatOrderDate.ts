export default function expectedOrderDate() {
  const currentDate = new Date()
  const date = currentDate.getDate()
  const numberOfDaysToAdd = 7
  const result = currentDate.setDate(date + numberOfDaysToAdd)
  const expectedDate = new Date(result)
  return expectedDate.toDateString()
}

export function formatOrderDate(date: string) {
  const givenDate = new Date(date)
  return givenDate.toDateString()
}
