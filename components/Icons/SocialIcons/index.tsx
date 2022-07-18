import FacebookIcon from '@/components/Icons/FacebookIcon'
import InstagramIcon from '@/components/Icons/InstagramIcon'
import PinterestIcon from '@/components/Icons/PinterestIcon'
import TwitterIcon from '@/components/Icons/TwitterIcon'

const iconArray = [
  {
    link: 'https://web.facebook.com/LiveHealthyHQ?_rdc=1&_rdr',
    icon: <FacebookIcon />,
    title: 'Facebook',
  },
  {
    link: 'https://twitter.com/livehealthyhq',
    icon: <TwitterIcon />,
    title: 'Twitter',
  },
  {
    link: 'https://www.instagram.com/livehealthyhq',
    icon: <InstagramIcon />,
    title: 'Instagram',
  },
  {
    link: 'https://in.pinterest.com/LiveHealthyHQ',
    icon: <PinterestIcon />,
    title: 'Pinterest',
  },
]

export default function SocialIcons() {
  return (
    <div className="social-icon-group flex items-center justify-between w-3/4 xl:w-1/2">
      {iconArray.map((iconItem) => (
        <a
          key={iconItem.link}
          target="_blank"
          rel="noreferrer"
          title={iconItem.title}
          className="facebook"
          href={iconItem.link}
        >
          {iconItem.icon}
        </a>
      ))}
    </div>
  )
}
