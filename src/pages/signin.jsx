import React from 'react';
//import { useState } from 'react';
import { auth } from '../lib/clientApp';
//import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link';

const Signin = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((user) => {
        console.log('ログイン成功=', user.user.uid)
      })
      .catch((error) => {
        console.error(error)
      })
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <hr />
        <div>
          <button>ログイン</button>
        </div>
        <hr />
        <div>
          <Link href={'/signup'}><button>Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin