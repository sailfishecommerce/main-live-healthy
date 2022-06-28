export default function BlogAside({ children }: any) {
  return (
    <aside className="w-1/4 hidden lg:flex lg:flex-col mt-52 sticky top-24 z-30 right-24">
      {children}
    </aside>
  )
}
