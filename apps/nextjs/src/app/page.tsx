"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";

import { api } from "~/utils/api";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  const router = useRouter();

  const { data: session, isLoading: sessionIsLoading } =
    api.auth.getSession.useQuery();
  const { data: greetings, isLoading: greetingsIsLoading } =
    api.post.greeting.useQuery();

  async function signOut() {
    const response = await fetch("/api/auth/sign-out", {
      method: "POST",
      mode: "cors",
    });

    router.push(response?.url);
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-2 text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        <h1>{greetingsIsLoading ? "loading..." : greetings}</h1>
        <div className="flex gap-2">
          {!session?.data?.session ? (
            <button
              onClick={() => router.push("/login")}
              disabled={sessionIsLoading}
              className={`mb-2 rounded border border-gray-700 bg-white px-4 py-2 text-black transition-all hover:scale-105`}
            >
              {sessionIsLoading ? "Loading..." : "Sign Up"}
            </button>
          ) : (
            <button
              onClick={signOut}
              disabled={sessionIsLoading}
              className={`mb-2 rounded border border-gray-700 bg-red-500 px-4 py-2 text-white transition-all hover:scale-105`}
            >
              {sessionIsLoading ? "Loading..." : "Sign Out"}
            </button>
          )}
        </div>

        <CreatePostForm />
        <div className="h-[40vh] w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
