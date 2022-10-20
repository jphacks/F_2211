import styles from "./header.module.css";
import ImageContainer from "../ImageContainer/ImageContainer";
import Link from "next/link"

const Header = () => {
  return (
    <>
    <header className={styles.container}>
      <div className={styles["header--section"]}>
        <ImageContainer imagePath="/coffee.png" size="medium" />
        <h1>A CUP OF COFFEE</h1>
      </div>
      <div className={styles["header--section"]}>
        <div>検索</div>
        <Link href={"/signup"}>ユーザー</Link>
      </div>
      </header>
      <div className={styles.pad}></div>
    </>
  );
};

export default Header;