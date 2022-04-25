import classNames from 'classnames'

export type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={classNames('p-2 lg:p-0', className)}>{children}</div>
}
