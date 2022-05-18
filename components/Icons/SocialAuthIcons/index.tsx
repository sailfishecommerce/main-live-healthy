import FacebookIconFill from '@/components/Icons/FacebookIconFill'
import GoogleFillIcon from '@/components/Icons/GoogleFillIcon'
import InstagramFillIcon from '@/components/Icons/InstagramIconFill'
import { FacebookButton } from '@/scripts/facebook-script'

export default function Index() {
  return (
    <div className="social-button mt-4 flex items-center mx-auto justify-center">
      <FacebookButton />
      <button type="button" className="mx-2">
        <GoogleFillIcon />
      </button>
      <button type="button" className="mx-4">
        <FacebookIconFill />
      </button>
      <button type="button" className="mx-2">
        <InstagramFillIcon />
      </button>
    </div>
  )
}
