/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
  ElementType,
} from "airwallex-payment-elements";
import { useRouter } from "next/router";

import SpinnerRipple from "@/components/loader/SpinnerLoader";
import { useToast } from "@/hooks";

interface AirwallexDropinProps {
  intent_id: string | any;
  client_secret: string | any;
}

function AirwallexCardElement({
  intent_id,
  client_secret,
}: AirwallexDropinProps) {
  const [elementShow, setElementShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const { loadToast, successToast, errorToast } = useToast();

  useEffect(() => {
    if (errorMessage.length > 0) {
      errorToast(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    loadAirwallex({
      env: "demo",
      origin: window.location.origin,
      fonts: [
        {
          src: "https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2",
          family: "AxLLCircular",
          weight: 400,
        },
      ],
    }).then(() => {
      createElement("card" as ElementType)?.mount("airwallexCard");
    });

    const onReady = (event: CustomEvent): void => {
      setElementShow(true);
      getElement("card")?.focus();
    };

    const onError = (event: CustomEvent): void => {
      const { error } = event.detail;
      setIsSubmitting(false);
      errorToast(error);
      setErrorMessage(error.message ?? JSON.stringify(error));
    };

    window.addEventListener("onReady", onReady as EventListener);
    window.addEventListener("onError", onError as EventListener);
    return () => {
      window.removeEventListener("onReady", onReady as EventListener);
      window.removeEventListener("onError", onError as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!isSubmitting && errorMessage.length > 0) {
      errorToast(errorMessage);
    }
  }, [errorMessage, isSubmitting]);

  const triggerConfirm = (): void => {
    setIsSubmitting(true);
    loadToast();
    const card: any = getElement("card");
    if (card) {
      confirmPaymentIntent({
        element: card,
        id: intent_id,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      })
        .then((response) => {
          setIsSubmitting(false);
          successToast("Payment successful");
          window.alert(
            `Payment Intent confirmation was successful: ${JSON.stringify(
              response
            )}`
          );
          router.push("/checkout-complete");
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage(error.message ?? JSON.stringify(error));
          // console.error("There is an error", error);
          errorToast(error);
        });
    }
  };

  const fieldContainerStyle = elementShow ? "block" : "none";

  return (
    <div>
      {!elementShow && (
        <div className="loader flex m-auto justify-center">
          <SpinnerRipple />
        </div>
      )}
      {errorMessage.length > 0 && (
        <p
          className="alert bg-danger text-white text-center font-bold"
          id="error"
        >
          {errorMessage}
        </p>
      )}
      <div className={`field-container ${fieldContainerStyle}`}>
        <div
          id="airwallexCard"
          className="border border-gray-200 p-2 rounded-md h-10 items-center focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        />
        <button
          className="bg-red-500 flex justify-center items-center border-2 border-red-500 hover:text-red-500 text-white w-1/4 md:w-1/6 h-8 hover:bg-transparent  mx-auto my-2 rounded"
          onClick={triggerConfirm}
          aria-label="Make Payment"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
      <style jsx>{`
        .block {
          display: block;
        }
        .none {
          display: none;
        }
      `}</style>
    </div>
  );
}

const AirwallexCard = memo(AirwallexCardElement);

export default AirwallexCard;
