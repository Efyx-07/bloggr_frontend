import './SiteName.scss';
import { siteName } from '@/config';
import { Permanent_Marker } from 'next/font/google';

const font = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
});

export default function SiteName() {
  return <h1 className={`${font.className} site-name`}>{siteName}</h1>;
}
