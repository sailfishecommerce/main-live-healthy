/* eslint-disable react/no-array-index-key */
import checkoutFormInputs from '@/json/address-input-group.json'

interface Props {
  formik: any
}

interface InputProps {
  formContent: {
    className: string
    placeholder: string
    type: string
  }
}

interface TextAreaProps {
  formContent: {
    rows?: number
    className: string
    placeholder: string
    type: string
  }
}

export function TextArea({ formContent }: TextAreaProps) {
  return (
    <div className={formContent.className}>
      <textarea
        required
        className="form-control"
        rows={formContent.rows}
        placeholder={formContent.placeholder}
      ></textarea>
    </div>
  )
}

export function Input({ formContent }: InputProps) {
  return (
    <div className={`${formContent.className} flex flex-col`}>
      <input
        required
        className="border border-gray-200 rounded-md px-2 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        type={formContent.type}
        placeholder={formContent.placeholder}
      />
    </div>
  )
}

export function AddressInputGroup({ formik }: Props): JSX.Element {
  function updateInput(e: any) {
    e.preventDefault()
    formik.setValues({
      ...formik.values,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      {checkoutFormInputs.map((formRow, i) => (
        <div key={i} className="flex flex-wrap">
          {formRow.map((formInput, index) => (
            <div key={index} className="w-1/2">
              <div className="mb-3 flex flex-col mx-2">
                <label className="text-md mb-1" htmlFor={formInput.name}>
                  {formInput.label}
                </label>
                <input
                  value={formik.values[formInput.name]}
                  className="border border-gray-200 rounded-md h-10 px-2 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
                  name={formInput.name}
                  onChange={updateInput}
                />
                <p className="text-red-500 text-sm">
                  {formik.errors[formInput.name] &&
                    formik.errors[formInput.name]}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
