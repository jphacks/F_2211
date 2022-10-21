import { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import ImageContainer from "../ImageContainer/ImageContainer";
import Button from "../Button/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, db } from "../../lib/clientApp";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const Header = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const insideRef = useRef(null);
  const router = useRouter();

  const SingOut = () => {
    setOpen(false);
    setName("");
    signOut(auth)
      .then(() => {
        router.push("/signin");
      })
      .catch((error) => {
        alert("ログアウトに失敗しました。もう一度やり直してください。");
        console.error(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        router.push("/");
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const data = userDoc.data();
        setName(data.name);
      } else {
        router.push("/signin");
      }
    });
  }, []);

  useEffect(() => {
    const el = insideRef.current;
    if (!el) return;

    const handleClickOutside = (e) => {
      if (!el?.contains(e.target)) {
        setOpenUserInfo(false);
        console.log("outside");
      }
    };

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 50);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [insideRef, openUserInfo]);

  return (
    <>
      <header className={styles.container}>
        <Link href={"/"}>
          <div className={styles["header--section"]}>
            <ImageContainer imagePath="/coffee-white.png" size="large" />
            <p className={styles["header--title"]}>A CUP OF COFFEE</p>
          </div>
        </Link>
        <div className={styles["header-right"]}>
          {name && (
            <>
              <p style={{ marginRight: 16 }}>{name}さん、ようこそ！</p>
              <div
                onClick={() => {
                  setOpen(!open);
                }}
                style={{ cursor: "pointer" }}
              >
                <ImageContainer imagePath="/user-menu.svg" size="medium" />
              </div>
              {open && (
                <div className={styles["menu"]}>
                  <p onClick={SingOut} style={{ cursor: "pointer" }}>
                    サインアウト
                  </p>
                  <hr style={{ width: "100%", margin: 0 }} />
                  <p
                    onClick={() => {
                      setOpenUserInfo(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    ユーザー情報
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </header>
      {openUserInfo && (
        <div className={styles["modal"]}>
          <div className={styles["modal-card"]} ref={insideRef}>
            <p>ユーザー名：{name}</p>
            <p>お気に入り：</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
