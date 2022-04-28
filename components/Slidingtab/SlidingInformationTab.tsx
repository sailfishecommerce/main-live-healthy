import { useState } from 'react'

import SlidingTab from '@/components/Slidingtab'
import getProductInformationType from '@/components/Slidingtab/getProductInformationType'
import slidingInfoTabs from '@/json/slidingInfoTab.json'
import type { productType } from '@/types'

interface Props {
  product: productType
}

export default function SlidingInformation({ product }: Props) {
  const [informationType, setInformationType] = useState('Product Information')

  const selectInformationTypeHandler = (infoType: string) =>
    setInformationType(infoType)

  return (
    <SlidingTab buttonColor="text-white">
      <div className="header h-40 flex items-end bg-mountain-green p-4 w-full">
        {slidingInfoTabs.map((tab) => {
          const tabStyle =
            tab.value === informationType ? 'text-white' : 'text-gray-300'
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
      <div
        className="text-content sliding-tab bg-white px-6 pb-16"
        dangerouslySetInnerHTML={{
          __html: getProductInformationType(
            informationType,
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
