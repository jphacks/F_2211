import styles from "./Button.module.css";

const Button = (props) => {
  const {
    className = "",
    onClick,
    style,
    size = "large",
    disabled = false,
    type = "button",
    children,
  } = props;
  return (
    <button
      disabled={disabled}
      type={type}
      className={` ${styles[size]} ${className} ${styles.button}`}
      onClick={onClick}
      style={style}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
