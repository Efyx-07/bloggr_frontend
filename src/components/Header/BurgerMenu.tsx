import './BurgerMenu.scss';
import { Icon } from '@iconify/react';
import Navigator from './Navigator';

export default function BurgerMenu() {
  return (
    <div className="burger-menu">
      <div className="burger-menu-head">
        <div className="close-icon-container">
          <Icon icon="ei:close" className="close-icon" />
        </div>
      </div>
      <Navigator />
    </div>
  );
}
