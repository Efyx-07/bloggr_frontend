import { siteName } from '@/config';
import { Fredoka } from 'next/font/google';

const font = Fredoka({
  weight: '500',
  subsets: ['latin'],
});

export default function SiteName() {
  return (
    <h1 className={`${font.className} site-name text-accent`}>{siteName}</h1>
  );
}
