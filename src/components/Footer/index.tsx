import { siteName } from '@/config';
import TopScroller from './TopScroller';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="w-full h-28 bg-whiteRelief
        flex justify-center items-center relative"
    >
      <div className="w-full h-10 absolute bottom-[9.5rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 230"
          className="w-full h-20 absolute top-0"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,224C840,224,960,192,1080,181.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
      <div
        className="w-full max-w-[86rem] 
          mx-4 lg:mx-8
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
