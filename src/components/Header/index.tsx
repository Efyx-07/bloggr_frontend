'use client';

import Navigator from './Navigator';
import './Header.scss';

export default function Header() {
  const siteName = '.Bloggr';

  return (
    <header>
      <h1 className="site-name">{siteName}</h1>
      <Navigator />
    </header>
  );
}
