import Link from "next/link";

import LoginForm from "./LoginForm";
import OnBoardSection from "../OnBoardSection";

const LoginContainer = () => {
  return (
    <OnBoardSection
      heading="Access your Account"
      paragaph="Fill your Fusion Domain name to Login."
    >
      <p className="mt-8 font-noto text-sm text-text-gray">
        Your Fusion Domain
      </p>

      <LoginForm />

      <p className="mt-3 text-xs text-black">
        Don't have an account?{" "}
        <Link
          className="bg-gradient-primary-light font-semibold gradient-text hover:cursor-pointer"
          href="/signUp"
        >
          Sign Up
        </Link>
      </p>
    </OnBoardSection>
  );
};

export default LoginContainer;
