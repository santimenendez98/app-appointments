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
  style,
  useBlur,
  onBlur,
  onChange,
}) {
  const inputProps = {
    defaultValue: defaultValue,
    ...register(name),
    ...(useBlur
      ? { onBlur: (e) => onBlur(e.target.value) }
      : { onChange: (e) => onChange(e.target.value) }),
  };

  return (
    <div className={styles.input}>
      <label>{label}: </label>
      {type === "textarea" ? (
        <textarea {...inputProps} placeholder={placeholder}></textarea>
      ) : (
        <input
          {...inputProps}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={style}
        />
      )}
      {error ? <span className={styles.error}>{error}</span> : "\u00A0"}
    </div>
  );
}

export default FormField;
