interface InputProps {
  placeholder: string
  className: string
  onChange: (e: any) => void
  value: string
  label?: string
  name?: string
}
export default function TextInput({
  placeholder,
  className,
  onChange,
  value,
  label,
  name,
}: InputProps) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={`border-gray-200 border-2 rounded-lg px-4 py-1 text-sm ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
