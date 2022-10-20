import { auth } from "../lib/clientApp";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

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
    <>
      <p>SignUp</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          width="40%"
          onChange={(event) => handleChangeEmail(event)}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          width="40%"
          onChange={(event) => handleChangePassword(event)}
        />
        <Button>登録</Button>
      </form>
    </>
  );
};

export default SignUp;
