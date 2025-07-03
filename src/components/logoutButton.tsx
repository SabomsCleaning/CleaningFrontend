"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/logout";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logout())}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      disabled={isPending}
    >
      {isPending ? "Loggar ut..." : "Logga ut"}
    </button>
  );
}
