import './Footer.scss';
import { siteName } from '@/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>
        © {currentYear} {siteName} | Tous droits réservés
      </p>
    </footer>
  );
}
