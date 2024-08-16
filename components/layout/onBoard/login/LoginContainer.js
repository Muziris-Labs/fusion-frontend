import Link from "next/link";

import LoginForm from "./LoginForm";
import OnBoardSection from "../OnBoardSection";

const LoginContainer = () => {
  return (
    <OnBoardSection heading="Sign in to Fusion" paragaph="">
      <div className="flex flex-col items-center">
        <LoginForm />

        <p className="mt-3 text-xs text-black">
          Don't have an account?{" "}
          <Link
            className="bg-gradient-primary-light font-semibold gradient-text hover:cursor-pointer"
            href="/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </OnBoardSection>
  );
};

export default LoginContainer;
