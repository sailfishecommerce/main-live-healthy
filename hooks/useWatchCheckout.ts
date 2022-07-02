import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { watchCheckoutFormAtom } from '@/lib/atomConfig'

export default function useWatchCheckout(addressType: string) {
  const [watchCheckoutForm, setWatchCheckoutForm] = useAtom(
    watchCheckoutFormAtom
  )

  useEffect(() => {
    if (!watchCheckoutForm.includes(addressType)) {
      setWatchCheckoutForm([...watchCheckoutForm, addressType])
    }
  }, [addressType, watchCheckoutForm, setWatchCheckoutForm])

  return { watchCheckoutForm }
}
