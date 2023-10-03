import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Compaigns from 'pages/extra-pages/Comapigns';
import GophishKey from 'pages/management/gophishKey';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const GoPhish = Loadable(lazy(() => import('pages/extra-pages/GoPhish')));
const UsersAndGroups = Loadable(lazy(() => import('pages/extra-pages/UsersAndGroups')));
const LandingPage = Loadable(lazy(() => import('pages/extra-pages/LandingPage')));
const Templates = Loadable(lazy(() => import('pages/extra-pages/Templates')));
const CompaignsResult = Loadable(lazy(() => import('pages/extra-pages/CompaignsResult')));
const SendingProfile = Loadable(lazy(() => import('pages/extra-pages/SendingProfile')));
const ReportPage = Loadable(lazy(() => import('pages/extra-pages/report')));
const UserMgt = Loadable(lazy(() => import('pages/management/user')));
const BillingMgt = Loadable(lazy(() => import('pages/management/billing')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// ==============================|| MAIN ROUTING ||============================== //
const token = localStorage.getItem('siemToken');
const MainRoutes = {
    path: '/',
    element: token ? <MainLayout /> : <AuthLogin />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        // {
        //     path: 'dashboard',
        //     children: [
        //         {
        //             path: 'default',
        //             element: <DashboardDefault />
        //         }
        //     ]
        // },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'Phishing',
            element: JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' ? <GoPhish /> : <Compaigns />
        },
        {
            path: '/user-page',
            element: JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' ? <UsersAndGroups /> : <Compaigns />
        },
        {
            path: '/templates',
            element: <Templates />
        },
        {
            path: '/user-mgt',
            element: JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' ? <UserMgt /> : <DashboardDefault />
        },
        {
            path: '/billing-mgt',
            element: JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' ? <BillingMgt /> : <DashboardDefault />
        },
        {
            path: '/key-mgt',
            element: JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' ? <GophishKey /> : <DashboardDefault />
        },
        {
            path: '/landing-page',
            element: <LandingPage />
        },
        {
            path: '/sending-profile',
            element: <SendingProfile />
        },
        {
            path: '/compaigns',
            element: <Compaigns />
        },
        {
            path: '/compaign/:id',
            element: <CompaignsResult />
        },
        // {
        //     path: 'siem',
        //     element: <ReportPage />
        // },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
