/* eslint-disable no-unneeded-ternary */
import useMediaQuery from '@/hooks/useMediaQuery'
import useScroll from '@/hooks/useScroll'

export default function useNavStyle() {
  const tabWidth = useMediaQuery('(max-width:768px)')
  const scrollGap = tabWidth ? 200 : 350
  const { scroll } = useScroll()
  const scrollUp = Number(scroll) > scrollGap ? true : false
  const navStyle = scrollUp ? 'fixed top-0 z-40 shadow-lg border-b' : ''
  const menuStyle = scrollUp ? 'flex' : 'hidden'

  return { navStyle, scrollUp, menuStyle }
}
