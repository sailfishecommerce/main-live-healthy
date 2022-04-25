import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

import type { inputContentType } from '@/typings'

interface Props {
  passwordVisibilityHandler: () => void
  showPassword: boolean
  formik: {
    handleBlur: () => void
    handleChange: () => void
    values: any
  }
  content: inputContentType
}

export default function PasswordInput({
  content,
  formik,
  passwordVisibilityHandler,
  showPassword,
}: Props) {
  const passwordVisibilty = showPassword ? 'text' : 'password'
  return (
    <div className="password-toggle relative">
      <input
        className="w-full border border-gray-200 px-2 rounded-md h-10 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        type={passwordVisibilty}
        name={content.name}
        placeholder={content.placeholder}
        id={content.id}
        value={formik.values[content.name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <button
        type="button"
        className="absolute right-4 top-2.5"
        aria-label="show/hide-password"
        onClick={passwordVisibilityHandler}
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  )
}
