import FacebookIconFill from '@/components/Icons/FacebookIconFill'
import GoogleFillIcon from '@/components/Icons/GoogleFillIcon'
import useFirebaseAuth from '@/hooks/useFirebaseAuth'
import { FacebookButton } from '@/scripts/facebook-script'

export default function Index() {
  const { GoogleSignin } = useFirebaseAuth()
  return (
    <div className="social-button mt-4 flex items-center mx-auto justify-center">
      <FacebookButton />
      <button type="button" className="mx-2" onClick={GoogleSignin}>
        <GoogleFillIcon />
      </button>
      <button type="button" className="mx-4">
        <FacebookIconFill />
      </button>
    </div>
  )
}
