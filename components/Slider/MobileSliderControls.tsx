/* eslint-disable react/no-array-index-key */
interface Props {
  active: number
  end: number
}
export default function MobileSliderControls({ active, end }: Props) {
  const arraylength = new Array(end).fill(0)

  return (
    <div className="controls flex justify-between items-center mx-auto w-full mt-4">
      <div className="flex items-center w-4/5 rounded-full">
        {arraylength.map((_, index) => {
          const activeTabIndex = Number(index) + 1
          const activeTab =
            active === activeTabIndex ? 'bg-mountain-green' : 'bg-gray-300'
          return <div key={index} className={`active w-1/6 h-1 ${activeTab}`} />
        })}
      </div>
      <div className="status font-medium text-gray-500">
        <span className="mountain-green">0{active} </span> / 0{end}
      </div>
    </div>
  )
}
