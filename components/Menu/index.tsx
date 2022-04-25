import PrimaryMenu from '@/components/Menu/PrimaryMenu'
import SecondaryMenu from '@/components/Menu/SecondaryMenu'
import MobileSearchbar from '@/components/Search/MobileSearchbar'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import Container from '@/layouts/Container'

export default function Menu() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { showMobileSearch } = useNav()

  return (
    <nav>
      <Container className="md:px-0 px-4 pb-3 md:pb-0">
        <PrimaryMenu />
        {!mobileWidth && <SecondaryMenu />}
        {mobileWidth && showMobileSearch && <MobileSearchbar />}
      </Container>
    </nav>
  )
}
