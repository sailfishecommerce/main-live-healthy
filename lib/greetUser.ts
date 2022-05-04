/* eslint-disable no-else-return */
export default function greetUser() {
  const today = new Date()
  const curHr = today.getHours()

  if (curHr < 12) {
    return 'Good Morning'
  } else if (curHr < 18) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}
