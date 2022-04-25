import { FormikProps } from "formik";

import countries from "@/json/countries.json";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateCountry } from "@/redux/payment-slice";
import { formType } from "@/types";

type countriesType = {
  name: string;
  Iso2: string | any;
  Iso3: string | null;
};

interface SelectCountriesProps {
  content: {
    name: string;
    label: string;
  };
  formik: FormikProps<formType>;
}

export default function SelectCountries({
  content,
  formik,
}: SelectCountriesProps) {
  const dispatch = useAppDispatch();
  const validCountry: countriesType[] = countries.data?.filter(
    (country) => country.Iso2
  );
  function selectHandler(e: any) {
    const country = e.target.value.toLowerCase();
    const selectedCountryArray = countries.data?.filter(
      (country) => country.Iso2 === e.target.value
    );
    const payload = {
      country,
    };
    formik.setValues({
      ...formik.values,
      ...payload,
    });
    dispatch(updateCountry(payload));
  }

  return (
    <div className="flex flex-col w-full mb-2 ml-1 pr-3">
      <label className="text-md mb-1" htmlFor="checkout-country">
        {content.label}
      </label>
      <select
        className="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        id="checkout-country"
        aria-label="select countries"
        name="country"
        onChange={selectHandler}
      >
        <option>Select country </option>
        {validCountry.map(({ name, Iso2 }, index) => (
          <option value={Iso2} key={index}>
            {name}
          </option>
        ))}
      </select>
      <p className="text-red-500">
        {formik.errors["country"] &&
          formik.touched["country"] &&
          formik.errors["country"]}
      </p>
    </div>
  );
}
