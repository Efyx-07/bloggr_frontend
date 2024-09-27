import './SiteName.scss';
import { siteName } from '@/config';
import { Chivo } from 'next/font/google';

const font = Chivo({
  weight: '400',
  subsets: ['latin'],
});

export default function SiteName() {
  return <h1 className={`${font.className} site-name`}>{siteName}</h1>;
}
