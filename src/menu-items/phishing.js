// assets
import { LoginOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    LogoutOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const phishing = {
    id: 'phishing',
    title: 'Phishing Simulation',
    type: 'group',
    children: [
        // {
        //     id: 'Admin-page',
        //     title: 'Phishing',
        //     type: 'item',
        //     url: '/phishing',
        //     icon: PersonOutlineIcon,
        //     color: '#ffffff',
        //     children: []
        // },
        {
            id: 'user-page',
            title: 'Users And Groups',
            type: 'item',
            url: '/user-page',
            icon: PersonOutlineIcon,
            color: '#ffffff'
        },
        {
            id: 'templates-page',
            title: 'Templates',
            type: 'item',
            url: '/templates',
            icon: PersonOutlineIcon,
            color: '#ffffff'
        },
        {
            id: 'landing-page',
            title: 'Landing Page',
            type: 'item',
            url: '/landing-page',
            icon: PersonOutlineIcon,
            color: '#ffffff'
        },
        {
            id: 'sending-profile',
            title: 'Sending Profile',
            type: 'item',
            url: '/sending-profile',
            icon: PersonOutlineIcon,
            color: '#ffffff'
        },
        {
            id: 'Compaigns-page',
            title: 'Compaign',
            type: 'item',
            url: '/compaigns',
            icon: AddBusinessIcon,
            color: '#ffffff'
        }
    ]
};

export default phishing;
