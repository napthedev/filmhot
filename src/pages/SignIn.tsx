import { FC, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { Navigate } from "react-router-dom";
import Title from "../components/Title";
import { auth } from "../shared/firebase";
import { useQueryParams } from "../hooks/useQueryParams";
import { useStore } from "../store";

const SignIn: FC = () => {
  const currentUser = useStore((state) => state.currentUser);

  const queryParams = useQueryParams();

  const [loading, setLoading] = useState(false);

  const handleSignInWithGoogle = () => {
    setLoading(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        console.log(res.user);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignInWithFacebook = () => {
    setLoading(true);

    signInWithPopup(auth, new FacebookAuthProvider())
      .then((res) => {
        console.log(res.user);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (currentUser) return <Navigate to={queryParams.get("redirect") || "/"} />;

  return (
    <>
      <Title value="Sign In - FilmHot" />
      <div className="min-h-screen w-screen bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full min-h-screen flex justify-center items-center bg-[#00000056]">
          <div className="w-[90vw] max-w-[350px] bg-black p-10 flex flex-col items-center gap-6 rounded-xl">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <button
              disabled={loading}
              onClick={handleSignInWithGoogle}
              className="flex items-center bg-white text-black p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
            >
              <img className="w-6 h-6" src="/google.svg" alt="" />

              <span>Sign In With Google</span>
            </button>

            <button
              disabled={loading}
              onClick={handleSignInWithFacebook}
              className="flex items-center bg-primary text-white p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
            >
              <img className="w-6 h-6" src="/facebook.svg" alt="" />

              <span>Sign In With Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
