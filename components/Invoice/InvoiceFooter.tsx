import FacebookIconFill from '@/components/Icons/FacebookIconFill'

export default function InvoiceFooter() {
  return (
    <div className="gratitude mt-4 flex flex-col">
      <p className="text-center my-1 text-lg font-thin">
        Thank you for being the best part of Live Healthy Stores!
      </p>
      <h4 className="text-center my-1 text-lg font-bold">
        Live Healthy Store HK
      </h4>
      <a
        className="text-center my-1 font-thin text-lg"
        href="mailto:care@livehealthy.com.hk"
      >
        care@livehealthy.com.hk
      </a>
      <a
        className="text-center font-thin text-lg"
        target="_blank"
        href="www.livehealthy.com.hk"
      >
        www.livehealthy.com.hk
      </a>
      <div className="mt-2 flex items-center mx-auto font-medium text-lg">
        <FacebookIconFill /> <p className="ml-4">LiveHealthy Online Store</p>
      </div>
    </div>
  )
}
