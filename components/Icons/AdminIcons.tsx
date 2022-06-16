import { FaBlog, FaFileInvoiceDollar } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { GiConvergenceTarget } from 'react-icons/gi'
import {
  MdOutlineCloudUpload,
  MdOutlineDashboard,
  MdPolicy,
} from 'react-icons/md'

interface AdminIconsProps {
  icon: string
}

export default function AdminIcons({ icon }: AdminIconsProps) {
  switch (icon) {
    case 'dashboard': {
      return <MdOutlineDashboard />
    }
    case 'invoice': {
      return <FaFileInvoiceDollar />
    }
    case 'upload-products': {
      return <MdOutlineCloudUpload />
    }
    case 'policies': {
      return <MdPolicy />
    }
    case 'order-tracking': {
      return <GiConvergenceTarget />
    }
    case 'cookie-policy': {
      return <GiConvergenceTarget />
    }
    case 'privacy-and-policy': {
      return <GiConvergenceTarget />
    }
    case 'terms-and-condition': {
      return <GiConvergenceTarget />
    }
    case 'shipping-info': {
      return <GiConvergenceTarget />
    }
    case 'return-and-refunds': {
      return <GiConvergenceTarget />
    }
    case 'blog': {
      return <FaBlog />
    }
    case 'settings': {
      return <FiSettings />
    }
    default:
      return null
  }
}
