import jwt_decode from 'jwt-decode'

export default function decodeJWT(token: string) {
  const decodedToken = jwt_decode(token)
  return decodedToken
}
