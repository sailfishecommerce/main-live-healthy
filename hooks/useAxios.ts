import axios from 'axios'

import { useAppSelector } from './useRedux'

export default function useAxios() {
  const airwallex = useAppSelector((state) => state.airwallex)

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AIRWALLEX_BASE_API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${airwallex.accessToken}`,
    },
  })

  return {
    axiosInstance,
  }
}
