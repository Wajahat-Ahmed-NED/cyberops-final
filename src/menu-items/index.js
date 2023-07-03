// project import
import pages from './pages';
import dashboard from './dashboard';
import support from './support';
import phishing from './phishing';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [phishing, support]
};
JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' && menuItems.items.unshift(pages);
export default menuItems;
