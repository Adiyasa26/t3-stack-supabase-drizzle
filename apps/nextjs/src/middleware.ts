import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Forward to protected route if we have a session
  if (session) {
    return res;
  }

  // Auth condition not met, redirect to login page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/login";
  redirectUrl.searchParams.set(
    `callbackUrl`,
    `${req.nextUrl.origin ?? ""}${req.nextUrl.pathname ?? ""}`,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // list all the pages you want protected here
  matcher: ["/protected-page"],
};
