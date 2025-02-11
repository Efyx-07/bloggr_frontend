import { siteName } from '@/config';
import { Fredoka } from 'next/font/google';
import { useRouter } from 'next/navigation';
import './SiteName.css';

const font = Fredoka({
  weight: '500',
  subsets: ['latin'],
});

export default function SiteName() {
  const router = useRouter();
  return (
    <h1
      onClick={() => router.push('/')}
      className={`${font.className} site-name cursor-pointer`}
    >
      {siteName}
    </h1>
  );
}
