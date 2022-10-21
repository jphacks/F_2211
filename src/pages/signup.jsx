import { auth } from "../lib/clientApp";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import styles from "../styles/signup.module.css";
import ImageContainer from "../components/ImageContainer/ImageContainer";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("user created");
        router.push("/");
      })
      .catch((error) => {
        alert("signup失敗");
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
          <ImageContainer imagePath="/coffee.png" size="larger" />
          <h1>A cup of coffee</h1>
        </div>
        <h2>Sing Up</h2>
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
          <Button className={styles["signup-button"]}>Sign Up</Button>
          <p style={{ display: "flex", marginTop: "16px", fontWeight: 600 }}>
            ログインは
            <Link href={"/signin"}>
              <span style={{ color: "var(--pink1)", cursor: "pointer" }}>
                こちら
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
