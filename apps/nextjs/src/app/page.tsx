"use client";

import { Suspense } from "react";
import Link from "next/link";

import { api } from "~/utils/api";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  const { data } = api.post.greeting.useQuery();

  async function signOut() {
    await fetch("/api/auth/sign-out", {
      method: "POST",
      mode: "cors",
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-2 text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        <h1>{data}</h1>
        <div className="flex gap-2">
          <Link
            href="/login"
            className="mb-2 rounded border border-gray-700 bg-white px-4 py-2 text-black transition-all hover:scale-105"
          >
            Sign Up
          </Link>
          <button
            onClick={signOut}
            className="bg-red mb-2 rounded border border-gray-700 px-4 py-2 text-black transition-all hover:scale-105"
          >
            Sign out
          </button>
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
