"use client";

import { useState } from "react";
import { FieldError, Input, Label, TextField, toast } from "@heroui/react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { signIn } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

export default function LoginForm({ redirect }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const { email, password, remember } = Object.fromEntries(new FormData(e.currentTarget));
    setLoading(true);
    const { error } = await signIn.email({ email, password, rememberMe: Boolean(remember) });
    if (error) {
      toast.danger(error.message || "Invalid email or password");
      setLoading(false);
      return;
    }
    toast.success("Welcome back!");
    // Full navigation so protected pages aren't served from a pre-login prefetch
    window.location.assign(redirect);
  };

  return (
    <>
      <form onSubmit={submit} className="space-y-5">
        <TextField name="email" type="email" isRequired>
          <Label>Email Address</Label>
          <Input placeholder="Enter your email" autoComplete="email" />
          <FieldError />
        </TextField>

        <TextField name="password" type={show ? "text" : "password"} isRequired>
          <Label>Password</Label>
          <div className="relative">
            <Input placeholder="Enter your password" autoComplete="current-password" className="w-full pr-10" />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            >
              {show ? <LuEyeOff /> : <LuEye />}
            </button>
          </div>
          <FieldError />
        </TextField>

        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="remember" defaultChecked className="size-4 accent-brand" /> Remember me
        </label>

        <button type="submit" disabled={loading} className="btn-brand w-full !py-3.5 disabled:opacity-60">
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
      <GoogleButton redirect={redirect} />
    </>
  );
}
