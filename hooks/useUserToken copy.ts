/* eslint-disable react-hooks/exhaustive-deps */
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch } from "@/redux/store";
import { updateUserDetails } from "@/redux/user-slice";
import { authorizeUser } from "@/redux/auth-slice";

type userDetailType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
} | null;

export default function useUserToken() {
  const dispatch = useAppDispatch();

  function generateUserToken(userDetail: userDetailType) {
    if (userDetail !== null) {
      dispatch(
        authorizeUser({
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
          email: userDetail.email,
        })
      );
      dispatch(updateUserDetails(userDetail.id));
    } else {
      const generatedUserId = uuidv4();
      dispatch(updateUserDetails(generatedUserId));
    }
  }

  return { generateUserToken };
}
