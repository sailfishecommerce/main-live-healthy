import { FaBlog, FaFileInvoiceDollar } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { GiConvergenceTarget } from 'react-icons/gi'
import {
  MdOutlineCloudUpload,
  MdOutlineDashboard,
  MdPermMedia,
  MdPolicy,
} from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

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
    case 'blog': {
      return <FaBlog />
    }
    case 'settings': {
      return <FiSettings />
    }
    case 'media': {
      return <MdPermMedia />
    }
    case 'team': {
      return <RiTeamFill />
    }
    default:
      return <GiConvergenceTarget />
  }
}
