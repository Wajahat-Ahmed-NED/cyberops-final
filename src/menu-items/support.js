// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import ReportIcon from '@mui/icons-material/Report';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonIcon from '@mui/icons-material/Person';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import BugReportIcon from '@mui/icons-material/BugReport';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Details',
    type: 'group',
    children: [
        {
            id: 'Offenses',
            title: 'Offenses',
            type: 'item',
            url: '/sample-page',
            icon: ReportIcon,
            color: '#ffffff'
        },

        {
            id: 'Companies-page',
            title: 'Companies',
            type: 'item',
            url: '/sample-page',
            icon: AddBusinessIcon,
            color: '#ffffff'
        },
        {
            id: 'Individual-page',
            title: 'Individual User',
            type: 'item',
            url: '/sample-page',
            icon: PersonIcon,
            color: '#ffffff'
        },
        {
            id: 'License-page',
            title: 'License Keys',
            type: 'item',
            url: '/sample-page',
            icon: KeyOutlinedIcon,
            color: '#ffffff'
        },
        {
            id: 'Email-page',
            title: 'Email Configuration',
            type: 'item',
            url: '/sample-page',
            icon: EmailOutlinedIcon,
            color: '#ffffff'
        },
        {
            id: 'Download-page',
            title: 'Download',
            type: 'item',
            url: '/sample-page',
            icon: FileDownloadOutlinedIcon,
            color: '#ffffff'
        },
        {
            id: 'FileGroup-page',
            title: 'FileGroup Manager',
            type: 'item',
            url: '/sample-page',
            icon: FileCopyIcon,
            color: '#ffffff'
        },
        {
            id: 'FSRM-page',
            title: 'FSRM Settings',
            type: 'item',
            url: '/sample-page',
            icon: SettingsIcon,
            color: '#ffffff'
        },
        {
            id: 'Invoices-page',
            title: 'Invoices',
            type: 'item',
            url: '/sample-page',
            icon: ReceiptIcon,
            color: '#ffffff'
        },
        {
            id: 'Verification-page',
            title: 'Verification SMS',
            type: 'item',
            url: '/sample-page',
            icon: DomainVerificationIcon,
            color: '#ffffff'
        },
        {
            id: 'VirusTotal-page',
            title: 'VirusTotal Scan',
            type: 'item',
            url: '/sample-page',
            icon: BugReportIcon,
            color: '#ffffff'
        },
        {
            id: 'RansomeSecure-page',
            title: 'RansomeSecure Training',
            type: 'item',
            url: '/sample-page',
            icon: CastForEducationIcon,
            color: '#ffffff'
        },
        {
            id: 'FAQ',
            title: 'FAQ',
            type: 'item',
            url: '/sample-page',
            icon: LiveHelpIcon,
            color: '#ffffff'
        },
        {
            id: 'ForumCategory-page',
            title: 'ForumCategory',
            type: 'item',
            url: '/sample-page',
            icon: ForumIcon,
            color: '#ffffff'
        },
        {
            id: 'Forum-page',
            title: 'Forum',
            type: 'item',
            url: '/sample-page',
            icon: ForumIcon,
            color: '#ffffff'
        },
        {
            id: 'Vulnerability-page',
            title: 'Vulnerability Scanner',
            type: 'item',
            url: '/sample-page',
            icon: DocumentScannerIcon,
            color: '#ffffff'
        },
        {
            id: 'SIEM-page',
            title: 'SIEM',
            type: 'item',
            url: '/siem',
            icon: DataSaverOffIcon,
            color: '#ffffff'
        }
    ]
};

export default support;
