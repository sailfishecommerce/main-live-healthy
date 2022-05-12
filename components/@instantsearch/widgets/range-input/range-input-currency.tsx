import classNames from 'classnames'
import type { ReactElement } from 'react'
import { Children, cloneElement } from 'react'

export type RangeInputCurrencyProps = {
  children: React.ReactNode
  currency?: string
}

export function RangeInputCurrency({
  children,
  currency = 'HKD',
}: RangeInputCurrencyProps) {
  const child = Children.only(children) as ReactElement
  const props = {
    className: classNames(child.props.className, '!pl-10'),
  }

  return (
    <span
      className="w-full relative before:content-[attr(data-currency)] before:text-neutral-darkest before:flex before:items-center before:ml-2 before:absolute before:w-full before:h-full before:inset-0 before:top-px before:pointer-events-none"
      data-currency={currency}
    >
      {cloneElement(child, props)}
    </span>
  )
}
