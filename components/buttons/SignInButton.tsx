"use client";
import { signIn, signOut } from "next-auth/react";

type SignInButtonProps = {
  isSignedIn: boolean;
};
export function SignInButton({ isSignedIn }: SignInButtonProps) {
  const buttonText = isSignedIn ? "Sign Out" : "Sign In";
  return (
    <button
      className="bg-accent text-white cursor-pointer font-[300] text-sm leading-normal px-4 py-3 focus:outline-white focus:duration-75 outline-highlight outline-1 outline uppercase tracking-wide ease-out duration-150 hover:outline-white motion-safe:hover:outline-offset-[4px] hover:bg-opacity-100 bg-opacity-80 m-4 active:bg-opacity-100"
      aria-label={buttonText}
      type="button"
      onClick={() => (isSignedIn ? signOut() : signIn("bungie"))}
    >
      {buttonText}
    </button>
  );
}
