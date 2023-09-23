import React from "react";

import { serverClient } from "@acme/api";

export const dynamic = "force-dynamic";

const ProtectedPage = async () => {
  const server = await serverClient();

  const secretMessage = await server.auth.getSecretMessage();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-2 text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        {secretMessage}
      </div>
    </div>
  );
};

export default ProtectedPage;
