import Link from "next/link";

export default function SignupFooter() {
  return (
    <p className="mt-3 font-noto text-xs text-gray-600">
      Already have an account?{" "}
      <Link href="/login" className="text-black font-bold">
        Login
      </Link>
    </p>
  );
}
