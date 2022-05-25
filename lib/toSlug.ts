export default function toSlug(value: string) {
  const slug = value?.toLocaleLowerCase()?.replaceAll(' ', '-')
  return slug
}
