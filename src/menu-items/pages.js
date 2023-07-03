// assets
import { LoginOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';

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
            icon: icons.ProfileOutlined
        },
        {
            id: 'billing',
            title: 'Billing ',
            type: 'item',
            url: '/billing-mgt',
            icon: icons.ProfileOutlined
        }
    ]
};

export default pages;
