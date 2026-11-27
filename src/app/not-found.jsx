import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-display text-8xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold">Looks like you&apos;re off the map</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
      <Link href="/destinations" className="btn-brand mt-8">Explore Destinations</Link>
    </div>
  );
}
