interface InputProps {
  placeholder: string;
  className: string;
}
export default function Input({ placeholder, className }: InputProps) {
  return (
    <input
      className={`border-gray-200 border-2 rounded-lg px-4 py-1 text-sm ${className}`}
      placeholder={placeholder}
    />
  );
}
