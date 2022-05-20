import FacebookIconFill from '@/components/Icons/FacebookIconFill'
import GoogleFillIcon from '@/components/Icons/GoogleFillIcon'
import useFirebaseAuth from '@/hooks/useFirebaseAuth'

export default function Index() {
  const { GoogleSignin, FacebookSignin } = useFirebaseAuth()
  return (
    <div className="social-button mt-4 flex items-center mx-auto justify-center">
      <button type="button" className="mx-2" onClick={GoogleSignin}>
        <GoogleFillIcon />
      </button>
      <button type="button" className="mx-4" onClick={FacebookSignin}>
        <FacebookIconFill />
      </button>
    </div>
  )
}
