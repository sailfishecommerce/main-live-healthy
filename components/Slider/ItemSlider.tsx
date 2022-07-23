import type { PropsWithChildren } from 'react'
import { FixedSizeList as List } from 'react-window'

interface Props {
  deviceWidth: {
    height: number
    width: number
    size: number
  }
  children: any
  itemData: any
  itemCount: number
}

export default function ItemSlider({
  deviceWidth,
  children,
  itemData,
  itemCount,
}: PropsWithChildren<Props>) {
  return (
    <>
      <div className="list">
        <List
          useIsScrolling
          height={deviceWidth.height}
          itemCount={itemCount}
          itemData={itemData}
          itemSize={deviceWidth.size}
          layout="horizontal"
          width={deviceWidth.width}
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
