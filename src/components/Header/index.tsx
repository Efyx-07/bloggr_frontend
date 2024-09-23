'use client';

import Navigator from './Navigator';
import './Header.scss';
import { Chivo } from 'next/font/google';

const font = Chivo({
  weight: '400',
  subsets: ['latin'],
});

export default function Header() {
  const siteName = '.Bloggr';

  return (
    <header>
      <div className="content">
        <h1 className={`${font.className} site-name`}>{siteName}</h1>
        <Navigator />
      </div>
    </header>
  );
}
