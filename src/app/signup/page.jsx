import AuthShell, { AuthSwitch, safeRedirect } from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = { title: "Create Account" };

export default async function SignupPage({ searchParams }) {
  const { redirect } = await searchParams;
  const to = safeRedirect(redirect);
  return (
    <AuthShell title="Create Account" subtitle="Start your adventure with Wanderlust" image="/assets/CTA.png">
      <SignupForm redirect={to} />
      <AuthSwitch text="Already have an account?" href={`/login?redirect=${encodeURIComponent(to)}`} label="Sign In" />
    </AuthShell>
  );
}
