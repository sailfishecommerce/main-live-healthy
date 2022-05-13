import { useAtom } from 'jotai'

import SlidingTab from '@/components/Slidingtab'
import getProductInformationType from '@/components/Slidingtab/getProductInformationType'
import slidingInfoTabs from '@/json/slidingInfoTab.json'
import { seemoreAtom } from '@/lib/atomConfig'
import type { productType } from '@/types'

interface Props {
  product: productType
}

export default function SlidingInformation({ product }: Props) {
  const [seemoreTab, setSeemoreTab]: any = useAtom<string | null>(seemoreAtom)

  const selectInformationTypeHandler = (infoType: string) =>
    setSeemoreTab(infoType)

  return (
    <SlidingTab buttonColor="text-white">
      <div className="header lg:h-40 justify-between flex lg:items-end bg-mountain-green p-4 w-full lg:flex-row flex-col items-start py-8">
        {slidingInfoTabs.map((tab) => {
          const tabStyle =
            tab.value === seemoreTab ? 'text-white' : 'text-gray-300'
          return (
            <button
              type="button"
              key={tab.value}
              aria-label="button"
              className={`${tabStyle} font-bold xl:text-md xl:mx-1 xl:mr-0 text-lg 2xl:text-lg 2xl:mr-4 mx-2`}
              onClick={() => selectInformationTypeHandler(tab.value)}
            >
              {tab.title}
            </button>
          )
        })}
      </div>
      <h1 className="font-bold text-xl m-2 mx-6">
        {seemoreTab === 'STORAGE INSTUCTIONS'
          ? 'Storage Instructions'
          : seemoreTab === 'Directions' && 'Directions'}
      </h1>
      <div
        className="text-content sliding-tab bg-white px-6 pb-16"
        dangerouslySetInnerHTML={{
          __html: getProductInformationType(seemoreTab, product.description),
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
