import FooterAddress from '@/components/Footer/FooterAddress'
import FooterDeals from '@/components/Footer/FooterDeals'
import FooterLink from '@/components/Footer/FooterLink'
import TrackingCode from '@/components/Vbout/TrackingCode'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-platinum py-8 md:px-4 xl:px-0 border-t">
      <TrackingCode />
      <div className="container mx-auto flex flex-col md:flex-row  items-start px-6 md:px-0">
        <FooterAddress />
        <FooterLink />
        <FooterDeals />
      </div>
    </footer>
  )
}
