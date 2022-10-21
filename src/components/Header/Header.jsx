import styles from "./header.module.css";
import ImageContainer from "../ImageContainer/ImageContainer";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/clientApp";

const Header = () => {
  const router = useRouter();
  const SingOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/signin");
      })
      .catch((error) => {
        alert("ログアウトに失敗しました。もう一度やり直してください。");
        console.error(error);
      });
  };

  return (
    <>
      <header className={styles.container}>
        <div className={styles["header--section"]}>
          <ImageContainer imagePath="/coffee.png" size="medium" />
          <Link href={"/"}>A CUP OF COFFEE</Link>
        </div>
        <div className={styles["header--section"]}>
          <div>検索</div>
          <Link href={"/signup"}>ユーザー</Link>
        </div>
        <button onClick={() => SingOut()}>サインアウト</button>
      </header>
      <div className={styles.pad}></div>
    </>
  );
};

export default Header;
