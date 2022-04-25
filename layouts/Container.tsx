import type { PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export default function Container({
  className,
  children,
}: PropsWithChildren<Props>) {
  const containerClassName = className ? className : ''
  return (
    <div className={`${containerClassName} container mx-auto`}>{children}</div>
  )
}
