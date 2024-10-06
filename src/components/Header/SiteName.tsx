import { siteName } from '@/config';
import { Fredoka } from 'next/font/google';
import './SiteName.css';

const font = Fredoka({
  weight: '500',
  subsets: ['latin'],
});

export default function SiteName() {
  return <h1 className={`${font.className} site-name`}>{siteName}</h1>;
}
