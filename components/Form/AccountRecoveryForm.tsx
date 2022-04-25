import { useState } from "react";
import { Formik } from "formik";

import { useAccount, useLoading } from "@/hooks";
import { passwordRecoverySchema } from "@/components/Form/schema/AuthSchema";
import { displayFormElement } from "@/components/Form/FormElement";
import passwordResetForm from "@/json/password-reset.json";

type stateType = { status: any; email?: string };

export default function AccountRecoveryform() {
  const { forgotPassword } = useAccount();
  const [recoveryStatus, setRecoveryStatus] = useState<null | stateType>(null);
  const { updateLoadingState } = useLoading();

  return (
    <div className="card py-2 mt-4">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={passwordRecoverySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          updateLoadingState();
          forgotPassword(values.email)
            .then((response) => {
              updateLoadingState();
              setRecoveryStatus({
                status: response,
                email: values.email,
              });
              resetForm();
            })
            .catch((error) => {
              setRecoveryStatus({
                status: error,
              });
              updateLoadingState();
              resetForm();
            });
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="card-body needs-validation"
            noValidate
          >
            {passwordResetForm.recover.map((formInput) => (
              <div key={formInput.name} className="col-12">
                {displayFormElement(formInput, formik)}
              </div>
            ))}
            <button
              aria-label="get new password"
              disabled={formik.isSubmitting}
              className="btn btn-primary"
              type="submit"
            >
              Get new password
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
