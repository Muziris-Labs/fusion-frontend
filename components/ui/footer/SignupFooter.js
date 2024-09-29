import Link from "next/link";

export default function SignupFooter() {
  return (
    <p className="mt-3 font-noto text-xs w-full flex justify-center text-gray-600">
      Already have an account?{"  "}
      <Link href="/" className="ml-1 text-black font-bold dark:text-white">
        Sign In
      </Link>
    </p>
  );
}
