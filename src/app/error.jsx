"use client";

export default function Error({ reset }) {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted">Please try again in a moment.</p>
      <button onClick={reset} className="btn-brand mt-6">Try again</button>
    </div>
  );
}
