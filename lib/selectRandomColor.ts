export default function selectRandomColor() {
  const colorsArray = ['#4017E0', '#C42340', '#50793E', '#C47723', '#E366B8']
  const randomNumber = Math.round(Math.random() * 4)
  const randomColor = colorsArray[randomNumber]
  return randomColor
}
