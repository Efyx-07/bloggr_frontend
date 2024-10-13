import { siteName } from '@/config';
import TopScroller from './TopScroller';
import WaveSvg from './WaveSvg';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="w-full h-28 bg-whiteRelief
        flex justify-center items-center relative"
    >
      <div className="w-full max-w-[86rem] mx-4 lg:mx-8 flex justify-center items-center relative">
        <p className="text-sm">
          © {currentYear} {siteName} | Tous droits réservés
        </p>
        <TopScroller />
      </div>
      <WaveSvg />
    </footer>
  );
}
