"use client";

import { useState } from "react";
import { FieldError, Input, Label, TextField, toast } from "@heroui/react";
import { signUp } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

export default function SignupForm({ redirect }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm, image } = Object.fromEntries(new FormData(e.currentTarget));
    if (password !== confirm) return toast.danger("Passwords don't match");
    setLoading(true);
    const { error } = await signUp.email({ name, email, password, image: image || undefined });
    if (error) {
      toast.danger(error.message || "Could not create account");
      setLoading(false);
      return;
    }
    toast.success("Account created — welcome to Wanderlust!");
    // Full navigation so protected pages aren't served from a pre-login prefetch
    window.location.assign(redirect);
  };

  return (
    <>
      <form onSubmit={submit} className="space-y-5">
        <TextField name="name" isRequired>
          <Label>Full Name</Label>
          <Input placeholder="Enter your name" autoComplete="name" />
          <FieldError />
        </TextField>
        <TextField name="email" type="email" isRequired>
          <Label>Email Address</Label>
          <Input placeholder="Enter your email" autoComplete="email" />
          <FieldError />
        </TextField>
        <TextField name="image" type="url">
          <Label>Photo URL (optional)</Label>
          <Input placeholder="https://…" />
          <FieldError />
        </TextField>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="password"
            type="password"
            isRequired
            value={password}
            onChange={setPassword}
            validate={(v) => (v.length < 6 ? "At least 6 characters" : null)}
          >
            <Label>Password</Label>
            <Input placeholder="Create a password" autoComplete="new-password" />
            <FieldError />
          </TextField>
          <TextField
            name="confirm"
            type="password"
            isRequired
            validate={(v) => (v && v !== password ? "Passwords don't match" : null)}
          >
            <Label>Confirm Password</Label>
            <Input placeholder="Confirm your password" autoComplete="new-password" />
            <FieldError />
          </TextField>
        </div>

        <button type="submit" disabled={loading} className="btn-brand w-full !py-3.5 disabled:opacity-60">
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>
      <GoogleButton redirect={redirect} label="Sign up with Google" />
    </>
  );
}
