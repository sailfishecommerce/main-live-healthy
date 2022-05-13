// import dynamic from 'next/dynamic'

import FooterText from '@/components/Footer/FooterText'
import Logo from '@/components/Logo'

import SocialIcons from '../Icons/SocialIcons'

// const DynamicSocialIcons = dynamic(
//   () =>
//     import(
//       /* webpackChunkName: 'DynamicSocialIcons' */ '@/components/Menu/LaptopPrimaryMenu'
//     )
// )

export default function FooterAddress() {
  return (
    <div className="address flex flex-col w-full md:w-1/4">
      <Logo className="w-1/3 my-2" />
      <SocialIcons />
      <FooterText />
    </div>
  )
}
