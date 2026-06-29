"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold text-zinc-100">Something broke in the build pipeline.</h1>
      <p className="text-sm text-zinc-400">{error.message}</p>
      <Button onClick={reset}>Retry</Button>
    </main>
  );
}
