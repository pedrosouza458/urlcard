'use client';

import WebsiteCard from '@/components/website-card';
import { useSearchParams } from 'next/navigation';
export default function Card() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return <div>No valid URL provided</div>;
  }

  return (
    <div>
      <h1>Card</h1>
      <WebsiteCard url={url} />
    </div>
  );
}