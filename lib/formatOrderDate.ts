export default function expectedOrderDate() {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const numberOfDaysToAdd = 7;
  var result = currentDate.setDate(date + numberOfDaysToAdd);
  const expectedDate = new Date(result);
  return expectedDate.toDateString();
}
