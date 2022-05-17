import type { PropsWithChildren } from 'react'

interface Props {
  id: string
}

export default function Tabpanel({ id, children }: PropsWithChildren<Props>) {
  return (
    <div
      className="tab-pane fade"
      id={id}
      role="tabpanel"
      aria-labelledby={`tabs-${id}`}
    >
      {children}
    </div>
  )
}
