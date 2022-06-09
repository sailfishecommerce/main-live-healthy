import dynamic from 'next/dynamic'
import { useState } from 'react'

const DynamicAdmimAuthForm = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicAdmimAuthForm' */ '@/components/Form/AdminAuthForm'
    ),
  { ssr: false }
)

interface Props {
  viewList: Array<{ viewId: string; text: string }>
  defaultView: string
  title: string
}

export default function SplittedView({ viewList, defaultView, title }: Props) {
  const [defaultViewState, setDefaultViewState] = useState(defaultView)

  function switchView() {
    switch (defaultViewState) {
      case 'create-admin-profile': {
        return (
          <div>
            <h2 className="text-center -mb-4 mt-4 font-bold text-lg">
              Sign up to create new Admin profile
            </h2>
            <DynamicAdmimAuthForm type="signup" />
          </div>
        )
      }
      default:
        return null
    }
  }

  return (
    <div className="content mt-4 flex h-full">
      <div className="settings w-1/3">
        <h1 className="text-xl font-semibold">{title}</h1>
        <ul>
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
      <div className="settings-view w-2/3 border-l-2">{switchView()}</div>
    </div>
  )
}
