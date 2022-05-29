import FacebookIcon from '@/components/Icons/FacebookIcon'
import InstagramIcon from '@/components/Icons/InstagramIcon'
import PinterestIcon from '@/components/Icons/PinterestIcon'
import TwitterIcon from '@/components/Icons/TwitterIcon'

export default function SocialIcons() {
  return (
    <div className="social-icon-group flex items-center justify-between w-3/4 xl:w-1/2">
      <a
        target="_blank"
        rel="noreferrer"
        className="facebook"
        href="https://web.facebook.com/LiveHealthyHQ?_rdc=1&_rdr"
      >
        <FacebookIcon />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/livehealthyhq"
      >
        <TwitterIcon />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.instagram.com/livehealthyhq"
      >
        <InstagramIcon />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://in.pinterest.com/LiveHealthyHQ"
      >
        <PinterestIcon />
      </a>
    </div>
  )
}
