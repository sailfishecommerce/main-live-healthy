import countries from '@/json/countries.json'

export default function getCountry(countryCode: string) {
  const country = countries.data.filter(
    (c) => c.Iso2 === countryCode?.toUpperCase()
  )
  return country[0]?.name
}
