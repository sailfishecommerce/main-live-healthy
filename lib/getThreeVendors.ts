export default function getThreeVendors(hits: any) {
  const vendorArray: string[] = []
  hits?.map((hit: any) => vendorArray.push(hit.vendor))
  const uniqueVendors = new Set(vendorArray)
  const uniqueVendorsArray = Array.from(uniqueVendors)
  const getFirstThreeVendors = uniqueVendorsArray.slice(0, 3)
  return getFirstThreeVendors
}
