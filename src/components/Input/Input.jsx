import { forwardRef, memo } from "react";

import styles from "./Input.module.css";

const Input = forwardRef(function Input(props, ref) {
  const { className, width, id, onClick, isRequired, readOnly, ...inputProps } =
    props;
  const { type, style, ...inputRestProps } = inputProps;
  return (
    <div
      style={{ display: "flex", position: "relative", width: width }}
      alignItems="center"
    >
      <input
        ref={ref}
        id={id}
        type={type}
        className={styles.input}
        style={{ ...style }}
        readOnly={readOnly}
        autoComplete="off"
        {...inputRestProps}
      />
    </div>
  );
});

export default memo(Input);
