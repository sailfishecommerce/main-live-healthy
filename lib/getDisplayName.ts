type adminType = {
  displayName?: string
  email: string
  phoneNumber?: number
  photoURL?: number
}

function getFirstLetter(word: string) {
  const letter = word?.split('')[0]
  return letter
}

export default function getAdminDisplayname(admin: adminType) {
  let displayNameInitials
  if (admin?.displayName) {
    const nameArray = admin?.displayName.split(' ')
    const firstLetter = getFirstLetter(nameArray[0])
    const secondLetter = getFirstLetter(nameArray[1])
    displayNameInitials = `${firstLetter} ${secondLetter}`
  } else if (admin?.email) {
    const nameArray = admin?.email.split('')
    displayNameInitials = `${nameArray[0]} ${nameArray[1]}`
  }
  return displayNameInitials
}
