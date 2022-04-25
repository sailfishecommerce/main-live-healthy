export default function getProductObjectID(link: string) {
  const productLink = link.split('+')[1]
  const objectID = productLink.includes('?queryID')
    ? productLink.split('?')[0]
    : productLink

  return objectID
}
