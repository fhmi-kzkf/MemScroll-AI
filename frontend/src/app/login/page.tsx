import HeaderLockup from "@/components/ui/HeaderLockup";
import DisplayHeadline from "@/components/ui/DisplayHeadline";
import PillButton from "@/components/ui/PillButton";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-bone-white">
      <HeaderLockup />
      <main className="px-4 md:px-8 pt-16 pb-32 max-w-[600px] mx-auto text-center flex flex-col items-center">
        <p className="text-[12px] uppercase text-graphite mb-4 tracking-normal">AUTHENTICATION</p>
        <DisplayHeadline className="mb-16">LOGIN</DisplayHeadline>
        
        <div className="w-full flex flex-col gap-6 text-left">
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full bg-transparent border-b border-ash py-4 text-[20px] font-light text-ink-black placeholder:text-ash focus:outline-none focus:border-ink-black transition-colors rounded-none"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-transparent border-b border-ash py-4 text-[20px] font-light text-ink-black placeholder:text-ash focus:outline-none focus:border-ink-black transition-colors rounded-none"
          />
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard">
              <PillButton>Sign In</PillButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
