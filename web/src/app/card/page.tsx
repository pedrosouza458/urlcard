'use client';

import WebsiteCard from '@/components/website-card';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
export default function Card() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return <div>No valid URL provided</div>;
  }
  const router = useRouter();
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const url = formData.get("url");
    router.push(`/card?url=${url}`);
    // ...
  }
  return (
    <div>
      <WebsiteCard url={url} />
      <div className="flex justify-center flex-row gap-3">
      <form onSubmit={onSubmit}>
          <input className="bg-slate-100 dark:bg-slate-800 w-96 p-4 rounded-xl" name="url" type="text" placeholder="Place you url" />
          <button type="submit" className="p-4 bg-black text-white dark:bg-white dark:text-black rounded-xl">Create card</button>
        </form>
      </div>
    </div>
  );
}