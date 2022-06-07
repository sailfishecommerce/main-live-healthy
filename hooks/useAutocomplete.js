export default function useAutocomplete() {
  let autoComplete

  const loadScript = (url, callback) => {
    let script = document.createElement('script') // create script tag
    script.type = 'text/javascript'

    // when script state is ready and loaded or complete we will call callback
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = () => callback()
    }

    script.src = url // load by url
    document.getElementsByTagName('head')[0].appendChild(script) // append to head
  }

  function handleScriptLoad(setValue, autoCompleteRef, country, setAddress) {
    // assign autoComplete with Google maps place one time
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        types: ['establishment', 'address'],
        componentRestrictions: { country },
      }
    )
    autoComplete.setFields(['address_components', 'formatted_address']) // specify what properties we will get from API
    // add a listener to handle when the place is selected
    autoComplete.addListener('place_changed', () =>
      handlePlaceSelect(setValue, setAddress)
    )
  }

  async function handlePlaceSelect(setValue, setAddress) {
    const addressObject = autoComplete.getPlace() // get place from google api
    const query = addressObject.address_components
    console.log('addressObject', addressObject)
    console.log('query', query)

    function filterLocation(location) {
      const place = query?.filter((adr) => adr.types[0] === location)

      const rightPlace = place[0]?.long_name
        ? place[0]?.long_name
        : place[0]?.short_name
      return rightPlace
    }

    const address = `${filterLocation('street_number')}  ${filterLocation(
      'route'
    )}  ${filterLocation('neighborhood')} ${filterLocation(
      'locality'
    )}`?.replaceAll('undefined', '')
    const district = filterLocation('neighborhood')?.replace('undefined', '')
    const zip = filterLocation('postal_code')?.replace('undefined', '')
    const region = filterLocation('administrative_area_level_1')?.replace(
      'undefined',
      ''
    )

    setAddress(address)
    setValue('district', district)
    setValue('zip', zip)
    setValue('region', region)
    console.log(addressObject)
  }

  return { handleScriptLoad, loadScript }
}
