"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <div className="mx-auto max-w-xl p-8 text-center">
      <h1 className="headline-large">문제가 발생했습니다.</h1>
      <p className="text-text-secondary mt-2">잠시 후 다시 시도해 주세요.</p>
      <button
        onClick={reset}
        className="bg-primary text-text-inverse mt-6 rounded-md px-4 py-2"
      >
        다시 시도
      </button>
    </div>
  );
}
