function getByteValue(
  byte: number,
  denominator: number,
  byteType: 'GB' | 'KB' | 'MB'
) {
  const byteValue = byte / denominator
  const bteValue2Sig = byteValue.toFixed(2)
  return `${bteValue2Sig} ${byteType}`
}

export default function byteSize(byte: number) {
  const givenByteSize = Number(byte)
  switch (true) {
    case givenByteSize < 1000000:
      return getByteValue(givenByteSize, 1000, 'KB')
    case givenByteSize > 1000000 && givenByteSize < 1000000000:
      return getByteValue(givenByteSize, 1000000, 'MB')
    case givenByteSize > 1000000000:
      return getByteValue(givenByteSize, 1000000000, 'GB')
    default:
      return null
  }
}
