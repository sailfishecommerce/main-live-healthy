import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from 'react-icons/fa'

export default function SocialIcons() {
  return (
    <div className="social-icon-group flex items-center justify-between w-1/2">
      <FaWhatsapp size={24} />
      <FaFacebook size={24} />
      <FaTwitter size={24} />
      <FaInstagram size={24} />
      <FaPinterest size={24} />
    </div>
  )
}
