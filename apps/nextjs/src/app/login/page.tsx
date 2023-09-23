import Link from "next/link";

import Messages from "./messages";

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default function Login(props: Props) {
  const callbackUrl = props?.searchParams?.callbackUrl ?? null;

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="mx-auto my-auto flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <Link
          href="/"
          className="text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <form
          className="text-foreground flex w-full flex-1 flex-col justify-center gap-2"
          action={`/api/auth/sign-in${
            callbackUrl ? `?callbackUrl=${callbackUrl}` : ""
          }`}
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="mb-2 rounded bg-green-700 px-4 py-2 text-white">
            Sign In
          </button>
          <button
            formAction="/api/auth/sign-up"
            className="mb-2 rounded border border-gray-700 px-4 py-2 text-black"
          >
            Sign Up
          </button>
          <Messages />
        </form>
      </div>
    </div>
  );
}
