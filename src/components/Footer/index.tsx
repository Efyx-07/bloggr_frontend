import './Footer.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>© {currentYear} - Bloggr - Tous droits réservés</p>
    </footer>
  );
}
