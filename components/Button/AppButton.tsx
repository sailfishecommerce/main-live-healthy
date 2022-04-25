/* eslint-disable react/button-has-type */
import { SpinnerRoller } from '@/components/Loader/SpinnerLoader'

interface ButtonProps {
  disable: boolean
  className: string
  onClick?: () => void
  loading: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
}

export default function AppButton({
  disable,
  className,
  onClick,
  loading,
  text,
  type,
}: ButtonProps) {
  const disableBtn = disable ? disable : false
  const loadingState = loading ? 'loading' : ''
  const btnType = type ? type : 'button'
  return (
    <button
      className={`btn position-relative flex justify-center items-center ${className}`}
      disabled={disableBtn}
      type={btnType}
      aria-label="button"
      onClick={onClick}
    >
      {loading && (
        <span>
          <SpinnerRoller />
        </span>
      )}
      <p className={`mb-0 text-truncate ${loadingState}`}>
        {loading ? 'Submitting ...' : text}
      </p>
      <style jsx>
        {`
          .loading {
            margin-left: 35px;
          }
        `}
      </style>
    </button>
  )
}
