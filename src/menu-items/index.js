// project import
import pages from './pages';
import dashboard from './dashboard';
import support from './support';
import phishing from './phishing';

//have to add support page for SIEM after its integration
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [phishing]
};
JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' && menuItems.items.unshift(pages);
export default menuItems;
