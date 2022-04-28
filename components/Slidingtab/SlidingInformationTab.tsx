import SlidingTab from '@/components/Slidingtab'
import getProductInformationType from '@/components/Slidingtab/getProductInformationType'
import { useAppSelector } from '@/hooks/useRedux'
import slidingInfoTabs from '@/json/slidingInfoTab.json'
import { useAppDispatch } from '@/redux/store'
import { updateSlidingTabInfo } from '@/redux/ui-slice'
import type { productType } from '@/types'

interface Props {
  product: productType
}

export default function SlidingInformation({ product }: Props) {
  const { slidingTabInfo } = useAppSelector((state) => state.UI)
  const dispatch = useAppDispatch()

  const selectInformationTypeHandler = (infoType: string) =>
    dispatch(updateSlidingTabInfo(infoType))

  return (
    <SlidingTab buttonColor="text-white">
      <div className="header h-40 flex items-end bg-mountain-green p-4 w-full">
        {slidingInfoTabs.map((tab) => {
          const tabStyle =
            tab.value === slidingTabInfo ? 'text-white' : 'text-gray-300'
          return (
            <button
              type="button"
              key={tab.value}
              className={`${tabStyle} font-bold text-md 2xl:text-lg 2xl:mr-4 mx-2`}
              onClick={() => selectInformationTypeHandler(tab.value)}
            >
              {tab.title}
            </button>
          )
        })}
      </div>
      <h1 className="font-bold text-xl m-2 mx-6">
        {slidingTabInfo === 'STORAGE INSTUCTIONS'
          ? 'Storage Instructions'
          : slidingTabInfo === 'Directions' && 'Directions'}
      </h1>
      <div
        className="text-content sliding-tab bg-white px-6 pb-16"
        dangerouslySetInnerHTML={{
          __html: getProductInformationType(
            slidingTabInfo,
            product.description
          ),
        }}
      />
      <style jsx>
        {`
          .text-content {
            overflow: auto;
            height: 80vh;
          }
        `}
      </style>
    </SlidingTab>
  )
}
