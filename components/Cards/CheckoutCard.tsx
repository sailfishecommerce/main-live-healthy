import type { PropsWithChildren } from 'react'

interface Props {
  title: string
}

export default function CheckoutCard({
  title,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="bg-white rounded-lg pt-6 p-3">
      <h1 className="text-xl font-bold mb-6">{title}</h1>
      <div className="content">{children}</div>
    </div>
  )
}
