/* eslint-disable import/dynamic-import-chunkname */
const options = {
  useCamelCase: true,
}

export default function useSwell() {
  async function swellInit() {
    const swell = await import('swell-js')
    swell.init(
      'sailfish-e-commerce-limited',
      'pk_392OXy2LAsQCLz7F9EQHEQ5tnVhAak6x',
      options
    )
    return { swell }
  }

  return {
    swellInit,
  }
}
