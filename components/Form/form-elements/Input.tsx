interface InputProps {
  content: {
    placeholder: string
    name: string
    inputType: string | 'email' | 'password' | 'text'
  }
}

export default function Input({ content }: InputProps) {
  return (
    <div className="flex justify-center my-1">
      <div className="form-floating mb-3 w-full">
        <input
          type={content.inputType}
          className="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id={content.name}
          placeholder={content.placeholder}
        />
        {/* <label htmlFor={content.name} className="text-gray-700 -mt-24">
          {content.placeholder}
        </label> */}
      </div>
    </div>
  )
}
