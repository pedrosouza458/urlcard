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
          <input className="bg-slate-100 dark:bg-slate-800 w-96 p-4 rounded-xl" name="url" type="text" placeholder="Place you url" />
          <button type="submit" className="p-4 bg-black text-white dark:bg-white dark:text-black rounded-xl">Create card</button>
        </form>
      </div>
    </div>
  );
}
