import Image from '@/components/Image'

export default function SliderImage({ content }: any) {
  return (
    <div className="flex">
      <Image src={content.src} alt={content.name} />
      <button type="button" aria-label={content.name}>
        {content.name}
      </button>
    </div>
  )
}
