import FooterAddress from '@/components/Footer/FooterAddress'
import FooterDeals from '@/components/Footer/FooterDeals'
import FooterLink from '@/components/Footer/FooterLink'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 border-t">
      <div className="container mx-auto flex flex-col md:flex-row  items-start px-6 md:px-0">
        <FooterAddress />
        <FooterLink />
        <FooterDeals />
      </div>
    </footer>
  )
}
