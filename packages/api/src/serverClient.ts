import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { db } from "@acme/db";

import { appRouter } from "./root";

export const serverClient = async () => {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  const serverClient = appRouter.createCaller({
    user,
    auth: supabase.auth,
    db,
  });

  return serverClient;
};
