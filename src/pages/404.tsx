import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

const Error: FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      <img className="w-full max-w-[200px] h-auto" src="/error.png" alt="" />
      <p className="text-xl">Something went wrong</p>

      {router.pathname !== "/" && (
        <Link href="/">
          <a className="text-primary">Return home</a>
        </Link>
      )}
    </div>
  );
};

export default Error;
