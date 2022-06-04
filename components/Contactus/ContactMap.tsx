/* eslint-disable jsx-a11y/iframe-has-title */
export default function ContactMap() {
  return (
    <div className="w-full md h-80 order-2 md:order-1 iframe-full-height-wrap mb-8">
      <iframe
        className="iframe-full-height h-full w-full"
        width="600"
        height="500"
        frameBorder="0"
        scrolling="no"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10/F,%20Cheung%20Hing%20Industrial%20Building,%2012P%20Smithfield,%20Kennedy%20Town,%20Hong%20Kong%20Island,%20Hong%20Kong.+(My%20Business%20Name)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  )
}
