import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full h-screen p-12 ">
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
        <h1 className="p-2 text-3xl font-bold text-transparent sm:text-5xl xl:text-6xl/none bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Revolutionize Your Note-Taking Experience
        </h1>
        <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
          Join us and collaborate with others in real-time. Fast, secure, and
          designed for modern life.
        </p>
        <div className="w-full max-w-sm mx-auto space-y-2">
          <div className="flex justify-between w-full space-x-2 ">
            <Link href="/join" className="w-full">
              <Button className="w-full">join</Button>
            </Link>
            <Link href="/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
          </div>
          <p className="text-xs text-zinc-200 dark:text-zinc-100">
            Get ready to revolutionize your experience.
            <Link className="text-white underline underline-offset-2" href="#">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
