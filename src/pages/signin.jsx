import React, { useState, useEffect } from "react";
import { auth } from "../lib/clientApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import styles from "../styles/signup.module.css";
import ImageContainer from "../components/ImageContainer/ImageContainer";
import { onAuthStateChanged } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((user) => {
        router.push("/");
      })
      .catch((error) => {
        alert("signinに失敗しました。もう一度やり直してください。");
        console.error(error);
      });
  };

  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles["signup-contents"]}>
        <div className={styles["signup-title"]}>
          <ImageContainer imagePath="/coffee-pink.png" size="larger" />
          <h1 style={{ marginLeft: 16 }}>A cup of coffee</h1>
        </div>
        <h2>Sing In</h2>
        <form onSubmit={handleSubmit} className={styles["signup-form"]}>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Please enter your Email"
            width="50%"
            style={{ borderRadius: "16px", marginTop: "16px" }}
            onChange={(event) => handleChangeEmail(event)}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Please enter your Password"
            width="50%"
            style={{ borderRadius: "16px", marginTop: "16px" }}
            onChange={(event) => handleChangePassword(event)}
          />
          <Button className={styles["signup-button"]} type="submit">
            Sing In
          </Button>
          <p
            style={{
              display: "flex",
              marginTop: "16px",
              fontWeight: 600,
              color: "var(--white1)",
            }}
          >
            サインアップは
            <Link href={"/signup"}>
              <span style={{ color: "var(--pink2)", cursor: "pointer" }}>
                こちら
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
