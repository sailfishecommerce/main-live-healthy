import { IoTimeSharp, IoMail, IoLocationSharp } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube, FaHeadset } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { RiExchangeDollarLine } from "react-icons/ri";
import { HiCreditCard } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";

interface Props {
  icon: string;
  className?: string;
  size?: number;
}

export default function Icons({ icon, className, size }: Props) {
  switch (icon) {
    case "location":
      return <IoLocationSharp size={size} className={className} />;
    case "phone":
      return <FiPhoneCall size={size} className={className} />;
    case "mail":
      return <IoMail size={size} className={className} />;
    case "time":
      return <IoTimeSharp size={size} className={className} />;
    case "facebook":
      return <FaFacebook size={size} className={className} />;
    case "instagram":
      return <FaInstagram size={size} className={className} />;
    case "youtube":
      return <FaYoutube size={size} className={className} />;
    case "rocket":
      return <IoRocket size={size} className={className} />;
    case "currency-exchange":
      return <RiExchangeDollarLine size={size} className={className} />;
    case "headset":
      return <FaHeadset size={size} className={className} />;
    case "creditcard":
      return <HiCreditCard size={size} className={className} />;
    case "arrow-prev":
      return <IoIosArrowBack size={size} className={className} />;
    case "arrow-next":
      return <IoIosArrowForward size={size} className={className} />;
    case "cart":
      return <BsCart4 size={size} className={className} />;
    default:
      return null;
  }
}
