import { useState } from 'react'

import splittedViewSwitch from '@/utils/splittedViewSwitch'

interface Props {
  viewList: Array<{ viewId: string; text: string }>
  defaultView: string
  title: string
}

export default function SplittedView({ viewList, defaultView, title }: Props) {
  const [defaultViewState, setDefaultViewState] = useState(defaultView)

  return (
    <div className="content mt-6 flex h-full">
      <div className="settings w-1/4">
        <h1 className="text-xl font-semibold">{title}</h1>
        <ul className="mt-6">
          {viewList.map((item) => {
            const activeItem =
              item.viewId === defaultViewState ? 'mountain-green' : ''
            return (
              <li className="text-lg my-2" key={item.viewId}>
                <button
                  type="button"
                  className={activeItem}
                  onClick={() => setDefaultViewState(item.viewId)}
                >
                  {item.text}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="settings-view w-2/3 border-l-2 px-4">
        {splittedViewSwitch(defaultViewState)}
      </div>
    </div>
  )
}
