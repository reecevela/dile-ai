import Image from "next/image";
import { SignupButton } from "@/components/auth/SignupButton";
import { LoginButton } from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LoginButton />
      <SignupButton />
    </div>
  );
}
