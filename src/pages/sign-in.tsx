import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useState } from "react";

import Meta from "@/components/Shared/Meta";
import Navigate from "@/components/Shared/Navigate";
import { userAtom } from "@/store";
import { supabase } from "@/utils/supabase";

const SignIn: FC = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (provider: "google" | "facebook") => {
    setLoading(true);

    let { user, error } = await supabase.auth.signIn(
      { provider },
      {
        redirectTo: `${location.origin}/sign-in`,
      }
    );

    console.log(user, error);

    setLoading(false);
  };

  if (user) return <Navigate to="/" />;

  return (
    <>
      <Meta
        title="Sign in - Filmhot"
        description="FilmHot - AdFree Movie / Anime Watching Website"
        image="/preview.png"
      />
      <div className="min-h-screen w-screen bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full min-h-screen flex justify-center items-center bg-[#00000056]">
          <div className="w-[90vw] max-w-[350px] bg-black p-10 flex flex-col items-center gap-6 rounded-xl">
            <h1 className="text-3xl font-semibold">Sign In</h1>

            {router.query.error_description && (
              <div className="p-3 bg-red-200 text-red-600 border border-red-400 w-full rounded">
                Error: {router.query.error_description}
              </div>
            )}

            <button
              disabled={loading}
              onClick={() => handleSignIn("google")}
              className="flex items-center bg-white text-black p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
            >
              <img className="w-6 h-6" src="/google.svg" alt="" />

              <span>Sign In With Google</span>
            </button>

            <button
              disabled={loading}
              onClick={() => handleSignIn("facebook")}
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
