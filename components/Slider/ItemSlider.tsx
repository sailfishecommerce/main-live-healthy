import type { PropsWithChildren } from 'react'
import { FixedSizeList as List } from 'react-window'

interface Props {
  deviceDimension: {
    height: number
    width: number
    size: number
  }
  children: any
  itemData: any
  itemCount: number
}

export default function ItemSlider({
  deviceDimension,
  children,
  itemData,
  itemCount,
}: PropsWithChildren<Props>) {
  return (
    <>
      <div className="list">
        <List
          useIsScrolling
          height={deviceDimension.height}
          itemCount={itemCount}
          itemData={itemData}
          itemSize={deviceDimension.size}
          layout="horizontal"
          width={deviceDimension.width}
        >
          {children}
        </List>
        <style jsx>{`
          @media (max-width: 768px) {
            .list {
              width: 100%;
              overflow-x: scroll;
              overflow-y: hidden;
            }
          }
        `}</style>
      </div>
    </>
  )
}
