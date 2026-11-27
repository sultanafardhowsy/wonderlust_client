import Image from "next/image";
import Link from "next/link";

export default function AuthShell({ title, subtitle, image = "/assets/Banner.png", children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image src={image} alt="" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <p className="font-display text-5xl font-bold leading-tight">
            The world is waiting.
            <br /> Let&apos;s go explore it.
          </p>
          <p className="mt-4 max-w-md text-white/75">
            Curated trips, expert local guides and 24/7 support — everything you need for your next adventure.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 pb-12 pt-28 sm:px-10">
        <div className="w-full max-w-md animate-fade-up">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function safeRedirect(value) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export function AuthSwitch({ text, href, label }) {
  return (
    <p className="mt-8 text-center text-sm text-muted">
      {text}{" "}
      <Link href={href} className="font-semibold text-brand hover:underline">
        {label}
      </Link>
    </p>
  );
}
