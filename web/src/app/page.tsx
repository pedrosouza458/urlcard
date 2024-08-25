"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Home() {
  const router = useRouter();
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const url = formData.get("url");
    router.push(`/card?url=${url}`);
    // ...
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <h1>URLCard</h1>
        <div className="flex justify-center flex-row gap-3">
        <form onSubmit={onSubmit}>
          <input className="w-96 bg-slate-100 p-4 rounded-xl" name="url" type="text" placeholder="Place you url" />
          <button type="submit" className="bg-slate-950 text-white p-4 rounded-xl">Create card</button>
        </form>
      </div>
    </div>
  );
}
