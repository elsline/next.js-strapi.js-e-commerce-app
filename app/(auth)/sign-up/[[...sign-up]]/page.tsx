import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen w-screen fixed flex justify-center bg-white items-center z-[100000]">
      <div className="container flex justify-center">
        <SignUp />;
      </div>
    </div>
  );
}
