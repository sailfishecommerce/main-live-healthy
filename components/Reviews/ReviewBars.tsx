interface Props {
  barWidth: number
  count: number
}
export default function ReviewBars({ barWidth, count }: Props) {
  const barPerentage = barWidth > 0 ? `${barWidth} %` : '0'
  return (
    <div className="review-bar flex items-center my-2 ml-4">
      <h4 className="count mr-6">{count}</h4>
      <div className="w-full bg-gray-200  rounded-full h-2.5">
        <div className="bar bg-mountain-green h-2.5 rounded-full" />
      </div>
      <p className="ml-6 lg:w-12 w-14">{barPerentage}</p>
      <style jsx>
        {`
          .bar {
            width: ${barWidth}%;
          }
        `}
      </style>
    </div>
  )
}
