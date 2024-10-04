import { siteName } from '@/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full h-28 flex justify-center items-center">
      <p className="text-sm">
        © {currentYear} {siteName} | Tous droits réservés
      </p>
    </footer>
  );
}
