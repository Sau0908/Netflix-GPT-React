import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSLice";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const toogleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  const handleButtonClick = () => {
    const msg = checkValidateData(email.current.value, password.current.value);
    if (msg) {
      setErrorMsg(msg);
      return;
    }

    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: name.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/125493327?s=400&u=fa990bf5582b34a86f2c8ba13b9a9f37fa0a9bce&v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          setErrorMsg(error.message);
          console.log(error);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((user) => {
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMsg(error.message);
          console.log(error);
        });
    }
  };

  return (
    <div className=" ">
      <Header />
      <div className="absolute w-full h-screen overflow-hidden">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs"
          alt="Netflix Bg"
          className="w-full cover-full "
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black text-white w-4/12 absolute p-10 my-28 mx-auto right-0 left-0 rounded bg-opacity-80"
      >
        <h1 className="text-3xl font-bold mb-4">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!signInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-2 w-full bg-gray-700 rounded "
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-3 my-2  w-full bg-gray-700 rounded"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-3 my-2 w-full bg-gray-700 rounded"
        />
        <h4 className="text-red-600 py-2 text-lg">{errorMsg}</h4>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold p-4 my-6 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toogleSignInForm}>
          {signInForm
            ? "New to Netflix? Sign Up Now"
            : "Already on Netflix? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
