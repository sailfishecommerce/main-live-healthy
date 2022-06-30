/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
import type { FormikProps } from 'formik'
import { Formik } from 'formik'

import { displayFormElement } from '@/components/Form/FormElement'
import { contactForMore } from '@/components/Form/schema/FormSchema'
import formContent from '@/json/contactForMore.json'
import type { contentType } from '@/typings/types'

export function mapContent(
  content: contentType,
  className: string,
  formik: FormikProps<any> | FormikProps<Record<string, unknown>>
) {
  return content.map((formElement, index: number) => (
    <div className={className} key={index}>
      {displayFormElement(formElement, formik, 'mb-0')}
    </div>
  ))
}

export default function ContactForMoreForm({ setStage }: any): JSX.Element {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        message: '',
      }}
      validationSchema={contactForMore}
      onSubmit={(values) => {
        alert(JSON.stringify(values))
        setStage(1)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {formContent.map((content, index) => (
            <div className="row" key={index}>
              {content.length === 2
                ? mapContent(content, 'col-sm-6', formik)
                : content.length === 1 &&
                  mapContent(content, 'col-sm-12', formik)}
            </div>
          ))}
          <button
            aria-label="Submit form"
            type="submit"
            className="btn flex m-auto btn-accent mt-2"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  )
}
