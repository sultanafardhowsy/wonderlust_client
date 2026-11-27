"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@heroui/react";
import { signIn } from "@/lib/auth-client";

export const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH === "true";

export default function GoogleButton({ redirect = "/", label = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);
  if (!googleEnabled) return null;

  const go = async () => {
    setLoading(true);
    const { error } = await signIn.social({ provider: "google", callbackURL: redirect });
    if (error) {
      toast.danger(error.message || "Google sign-in failed");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
        <span className="h-px flex-1 bg-line" /> Or continue with <span className="h-px flex-1 bg-line" />
      </div>
      <button
        type="button"
        onClick={go}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-line py-3 font-semibold transition hover:bg-black/[0.03] disabled:opacity-60"
      >
        <FcGoogle size={20} /> {loading ? "Redirecting…" : label}
      </button>
    </>
  );
}
