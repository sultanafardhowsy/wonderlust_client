import AuthShell, { AuthSwitch, safeRedirect } from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Sign In" };

export default async function LoginPage({ searchParams }) {
  const { redirect } = await searchParams;
  const to = safeRedirect(redirect);
  return (
    <AuthShell title="Welcome Back" subtitle="Resume your adventure with Wanderlust">
      <LoginForm redirect={to} />
      <AuthSwitch text="Don't have an account?" href={`/signup?redirect=${encodeURIComponent(to)}`} label="Sign Up" />
    </AuthShell>
  );
}
