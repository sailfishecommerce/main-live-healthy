import swell from 'swell-js'

export default function useLanguage() {
  async function getLanguageList() {
    return await swell.locale.list()
  }

  return {
    getLanguageList,
  }
}
