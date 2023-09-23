import React from "react";
import styles from "./input.module.css";

function FormField({
  label,
  type,
  placeholder,
  defaultValue,
  register,
  name,
  error,
  disabled,
  useBlur,
  onBlur,
  onChange,
  value,
}) {
  const inputProps = {
    defaultValue: defaultValue,
    ...register(name),
    ...(useBlur
      ? { onBlur: (e) => onBlur(e.target.value) }
      : { onChange: (e) => onChange(e.target.value) }),
    value: value,
  };

  return (
    <div>
      <div className="mr-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="relative mt-2 rounded-md">
          {type === "textarea" ? (
            <textarea
              {...inputProps}
              placeholder={placeholder}
              className={
                error
                  ? "w-96 md-sm:w-60 h-36 resize-none text-gray-900 ring-1 ring-inset ring-red-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  : "w-96 md-sm:w-60 h-36 resize-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
            ></textarea>
          ) : type === "checkbox" ? (
            <input
              {...inputProps}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className="block w-2 h-9 rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          ) : type === "select" ? (
            <select
              {...inputProps}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={
                error
                  ? "block w-96 md-sm:w-60 rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-red-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  : disabled
                  ? "block w-96 md-sm:w-60 h-9 rounded-md bg-gray-300 border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  : "block w-96 md-sm:w-60 h-9 rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
            >
              {name === "paidMonth" ? (
                <>
                  <option value="">Choose an option</option>
                  <option value="Jenuary">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="Jun">Jun</option>
                  <option value="July">July</option>
                  <option value="Agost">Agost</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </>
              ) : (
                <>
                  <option value="">Choose an Option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </>
              )}
            </select>
          ) : (
            <input
              {...inputProps}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={
                error
                  ? "block w-96 md-sm:w-60 rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-red-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  : disabled
                  ? "block w-96 md-sm:w-60 h-9 rounded-md bg-gray-300 border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  : "block w-96 md-sm:w-60 rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
            />
          )}
        </div>
      </div>
      {error ? <span className={styles.error}>{error}</span> : "\u00A0"}
    </div>
  );
}

export default FormField;
