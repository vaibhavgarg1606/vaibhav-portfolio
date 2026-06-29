export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-white/10 bg-zinc-900/70"
          />
        ))}
      </div>
    </main>
  );
}
