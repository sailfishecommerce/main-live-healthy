import axios from "axios";
import jwtDecode from "jwt-decode";

import { updateTokenStatus, paymentError } from "@/redux/airwallex-slice";

type payloadType = {
  tokenExpiryDate: null | string;
  accessToken: string | null;
};

type dispatchType = { payload: payloadType; type: string };

// returns TRUE if token is valid  and FALSE if token has expired
export function isTokenValid(tokenExpiryDate: string | null) {
  if (tokenExpiryDate) {
    const formatTokenExpiryDate = new Date(tokenExpiryDate);
    const currentDate = new Date();
    const isTokenNowValid = formatTokenExpiryDate > currentDate ? true : false;
    return isTokenNowValid;
  } else {
    return false;
  }
}

export function fetchAirwallexAccessToken(
  dispatch: (arg0: dispatchType) => void
) {
  return axios
    .get("/api/get-payment-token")
    .then(({ data }) => {
      console.log("paymentToken", data);
      const paymentPayload = {
        accessToken: data.token,
        tokenExpiryDate: data.expires_at,
      };
      dispatch(updateTokenStatus(paymentPayload));
      dispatch(paymentError(null));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(paymentError(error?.message));
    });
}

type decodeType = {
  iat: number;
  exp: number;
};

export function decodeAirwallexClientSecretToken(
  clientSecret: string | any
): decodeType {
  const decodeClientSecret: decodeType = jwtDecode(clientSecret);
  // console.log("decodeClientSecret", decodeClientSecret);
  return decodeClientSecret;
}

export function isClientSecretStillValid(expTime: number) {
  const reduceExpTimeBy10Mins = 10 * 60;
  const remainingTime = Number(expTime) - reduceExpTimeBy10Mins;
  const formatRemainingTime = remainingTime * 1000;
  const currentTime = new Date();
  const tokenTime = new Date(formatRemainingTime);
  const clientSecretIsValid = tokenTime > currentTime ? true : false;
  return clientSecretIsValid;
}

export function clientSecretValidity(clientSecret: string | any) {
  if (clientSecret) {
    const decodedClientSecret = decodeAirwallexClientSecretToken(clientSecret);
    const isClientSecretValid = isClientSecretStillValid(
      decodedClientSecret.exp
    );
    return isClientSecretValid;
  } else {
    return false;
  }
}
