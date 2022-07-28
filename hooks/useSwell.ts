/* eslint-disable import/dynamic-import-chunkname */
const options = {
  useCamelCase: true,
}

export default function useSwell() {
  async function swellInit() {
    const swell = await import('swell-js')
    swell.init(
      'sailfish-e-commerce-limited',
      `${process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY}`,
      options
    )
    return { swell }
  }

  return {
    swellInit,
  }
}
