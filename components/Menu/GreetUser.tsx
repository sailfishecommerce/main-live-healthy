import useGreetuser from '@/hooks/useGreetuser'
import greetUser from '@/lib/greetUser'

export default function GreetUser() {
  const { name } = useGreetuser()
  return (
    <div className="cart mountain-green font-bold text-xs">
      {name ? (
        <p className="text-xs lg:text-sm text-right">
          {greetUser()} {name ? `, ${name}` : ''}
        </p>
      ) : (
        <p className="text-xs md:text-sm text-right">{greetUser()}, Guest</p>
      )}
    </div>
  )
}
