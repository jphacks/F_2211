import styles from "./ImageContainer.module.css";

const ImageContainer = ({
  size = "large",
  imagePath,
  shape = "square",
  className,
}) => {
  return (
    <div className={`${styles[size]} ${className}`}>
      <div
        className={`${styles[shape]}`}
        style={{ backgroundImage: `url(${imagePath})` }}
      />
    </div>
  );
};

export default ImageContainer;
