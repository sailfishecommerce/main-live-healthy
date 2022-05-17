import FooterText from '@/components/Footer/FooterText'
import SocialIcons from '@/components/Icons/SocialIcons'
import Logo from '@/components/Logo'

export default function FooterAddress() {
  return (
    <div className="address flex flex-col w-full md:w-1/4">
      <Logo className="w-1/3 my-2" />
      <SocialIcons />
      <FooterText />
    </div>
  )
}
