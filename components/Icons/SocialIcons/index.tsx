import FacebookIcon from '@/components/Icons/FacebookIcon'
import InstagramIcon from '@/components/Icons/InstagramIcon'
import PinterestIcon from '@/components/Icons/PinterestIcon'
import TwitterIcon from '@/components/Icons/TwitterIcon'
import WhatsappIcon from '@/components/Icons/WhatsappIcon'

export default function SocialIcons() {
  return (
    <div className="social-icon-group flex items-center justify-between w-3/4 xl:w-1/2">
      <WhatsappIcon />
      <FacebookIcon />
      <TwitterIcon />
      <InstagramIcon />
      <PinterestIcon />
    </div>
  )
}
