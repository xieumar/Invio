import Image from "next/image";

/**
 * Full-screen loader shared by the auth and onboarding guards. Both guards
 * render the identical screen so the hand-off between them is seamless.
 */
export function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-bg text-text-primary p-6"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute w-24 h-24 rounded-full bg-purple/15 motion-safe:animate-ping"
          />
          <div className="relative w-20 h-20 rounded-3xl bg-surface shadow-lg shadow-purple/15 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Invio"
              width={40}
              height={40}
              className="object-contain motion-safe:animate-pulse"
              priority
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative h-1 w-32 overflow-hidden rounded-full bg-purple/15"
        >
          <div className="absolute inset-y-0 w-1/2 rounded-full bg-purple motion-safe:animate-loading-bar" />
        </div>

        <span className="sr-only">Loading Invio</span>
      </div>
    </div>
  );
}
