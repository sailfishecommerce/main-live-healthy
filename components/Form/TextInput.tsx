interface InputProps {
  placeholder: string
  className: string
  onChange: (e: any) => void
  value: string
  label?: string
  name?: string
  defaultValue?: string
}
export default function TextInput({
  placeholder,
  className,
  onChange,
  value,
  label,
  name,
  defaultValue,
}: InputProps) {
  return (
    <>
      {label && (
        <label className="text-lg mb-3" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        className={`border-gray-200 border-2 rounded-lg px-4 py-1 text-sm ${className}`}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </>
  )
}
