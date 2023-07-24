// assets
import { LoginOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import AttachMoneyOutlineIcon from '@mui/icons-material/AttachMoney';
import PersonAddAltOutlineIcon from '@mui/icons-material/PersonAddAlt';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    LogoutOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'authentication',
    title: 'Portal Management',
    type: 'group',
    children: [
        {
            id: 'login1',
            title: 'User ',
            type: 'item',
            url: '/user-mgt',
<<<<<<< HEAD
            icon: icons.ProfileOutlined
=======
            icon: PersonAddAltOutlineIcon
        },
        {
            id: 'billing',
            title: 'Billing ',
            type: 'item',
            url: '/billing-mgt',
            icon: AttachMoneyOutlineIcon
>>>>>>> 0a4daf088baa8d8dc89f6ab708868fad5271b761
        }
    ]
};

export default pages;
