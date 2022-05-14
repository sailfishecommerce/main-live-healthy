/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react'
import type { PropsWithChildren } from 'react'

interface Props {
  text: string
}

export default function Tooltip({ children, text }: PropsWithChildren<Props>) {
  let timeout: NodeJS.Timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, 400)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <>
      <div
        className="Tooltip-Wrapper"
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
      >
        {children}
        {active && <div className="Tooltip-Tip top hidden md:flex">{text}</div>}
      </div>
      <style jsx>
        {`
          .Tooltip-Wrapper {
            display: inline-block;
            position: relative;
          }

          .Tooltip-Tip {
            position: absolute;
            border-radius: 4px;
            left: 50%;
            transform: translateX(-50%);
            padding: 6px;
            color: white;
            background: black;
            font-size: 14px;
            font-family: 'Commissioner', sans-serif;
            font-display: swap;
            line-height: 1;
            z-index: 100;
            white-space: nowrap;
          }

          .Tooltip-Tip::before {
            content: ' ';
            left: 50%;
            border: solid transparent;
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-width: var(6px);
            margin-left: calc(var(6px) * -1);
          }

          .Tooltip-Tip.top {
            top: calc(var(30px) * -1);
          }

          .Tooltip-Tip.top::before {
            top: 100%;
            border-top-color: var(black);
          }

          .Tooltip-Tip.right {
            left: calc(100% + var(30px));
            top: 50%;
            transform: translateX(0) translateY(-50%);
          }

          .Tooltip-Tip.right::before {
            left: calc(var(6px) * -1);
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-right-color: var(black);
          }

          .Tooltip-Tip.bottom {
            bottom: calc(var(30px) * -1);
          }

          .Tooltip-Tip.bottom::before {
            bottom: 100%;
            border-b-4-color: var(black);
          }

          .Tooltip-Tip.left {
            left: auto;
            right: calc(100% + var(30px));
            top: 50%;
            transform: translateX(0) translateY(-50%);
          }

          .Tooltip-Tip.left::before {
            left: auto;
            right: calc(var(6px) * -2);
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-left-color: var(black);
          }
        `}
      </style>
    </>
  )
}
