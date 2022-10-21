import styles from "./StorePin.module.css";

const StorePin = (props) => {
  const { storeInfo } = props;
  return (
    <div
      className={`${className} ${styles.button}`}
      onClick={onClick}
      style={style}
    >
      <span>{children}</span>
    </div>
  );
};

export default StorePin;
