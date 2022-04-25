import checkoutFormInputs from "@/json/address-input-group.json";

interface Props {
  formik: any;
}

interface InputProps {
  formContent: {
    className: string;
    placeholder: string;
    type: string;
  };
}

interface TextAreaProps {
  formContent: {
    rows?: number;
    className: string;
    placeholder: string;
    type: string;
  };
}

export function TextArea({ formContent }: TextAreaProps) {
  return (
    <div className={formContent.className}>
      <textarea
        className="form-control"
        rows={formContent.rows}
        placeholder={formContent.placeholder}
        required
      ></textarea>
    </div>
  );
}

export function Input({ formContent }: InputProps) {
  return (
    <div className={`${formContent.className} flex flex-col`}>
      <input
        className="border border-gray-200 rounded-md px-2 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        type={formContent.type}
        placeholder={formContent.placeholder}
        required
      />
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */

export function AddressInputGroup({ formik }: Props): JSX.Element {
  function updateInput(e: any) {
    e.preventDefault();
    formik.setValues({
      ...formik.values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      {checkoutFormInputs.map((formRow, index) => (
        <div key={index} className="flex flex-wrap">
          {formRow.map((formInput, index) => (
            <div key={index} className="w-1/2">
              <div className="mb-3 flex flex-col mx-2">
                <label className="text-md mb-1" htmlFor={formInput.name}>
                  {formInput.label}
                </label>
                <input
                  value={formik.values[formInput.name]}
                  className="border border-gray-200 rounded-md h-10 px-2 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
                  onChange={updateInput}
                  name={formInput.name}
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
  );
}
