import { siteName } from '@/config';
import TopScroller from './TopScroller';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="
        w-full h-28 bg-white 
        flex justify-center items-center
      "
    >
      <div
        className="
          w-full max-w-[90rem] 
          mx-4 lgInter:mx-8
          flex justify-center items-center
          relative
        "
      >
        <p className="text-sm">
          © {currentYear} {siteName} | Tous droits réservés
        </p>
        <TopScroller />
      </div>
    </footer>
  );
}
