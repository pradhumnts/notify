// components
import SvgIconStyle from '../../../components/SvgIconStyle';
// ----------------------------------------------------------------------
import { PATH_CHANNEL } from 'src/routes/paths';

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  basket: getIcon('ic_basket'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  home: getIcon('ic-home'),
  wallet: getIcon('ic_wallet'),
  menu: getIcon('ic_menu_1'),
  settings: getIcon('ic_settings'),
};

const sidebarConfig = [
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Home', path: PATH_CHANNEL.root, icon: ICONS.home },
      { title: 'Analytics', path: '/dashboard/two', icon: ICONS.analytics },
      { title: 'Settings', path: '/settings', icon: ICONS.settings },
    ],
  },

];

export default sidebarConfig;
