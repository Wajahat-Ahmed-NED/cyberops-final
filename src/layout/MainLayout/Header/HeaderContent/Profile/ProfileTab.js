import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import LockResetIcon from '@mui/icons-material/LockReset';
// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { Modal, TextField, Checkbox, Button, Typography } from '@mui/material';
// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modal, setModal] = useState(false);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleModal = () => {
        setModal(!modal);
    };
    const [name, setName] = useState('');
    const [wazuhChecked, setWazuhChecked] = useState(false);
    const [gophishChecked, setGophishChecked] = useState(false);

    //   const handleOpen = () => {
    //     setOpen(true);
    //   };

    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleWazuhChange = (event) => {
        setWazuhChecked(event.target.checked);
    };

    const handleGophishChange = (event) => {
        setGophishChecked(event.target.checked);
    };

    const handleCreateUser = () => {
        const user = {
            name,
            wazuh: wazuhChecked,
            gophish: gophishChecked
        };
        let existingUsers = JSON.parse(localStorage.getItem('Users'));
        existingUsers ? existingUsers.push(user) : (existingUsers = [user]);
        localStorage.setItem('Users', JSON.stringify(existingUsers));
        console.log(existingUsers);
    };
    return (
        <>
            <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
                {/* <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                    <EditOutlined />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                    <UserOutlined />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
            </ListItemButton> */}

                {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon>
                    <ProfileOutlined />
                </ListItemIcon>
                <ListItemText primary="Social Profile" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                <ListItemIcon>
                    <WalletOutlined />
                </ListItemIcon>
                <ListItemText primary="Billing" />
            </ListItemButton> */}

                <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
                {JSON.parse(localStorage.getItem('userdata'))?.type === 'SuperUser' && (
                    <ListItemButton selected={selectedIndex === 3} onClick={handleModal}>
                        <ListItemIcon>
                            {/* <LogoutOutlined /> */}
                            <AddCircleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create User" />
                    </ListItemButton>
                )}
            </List>

            <Modal open={modal} onClose={handleModal}>
                <div className="modal-container">
                    <Typography variant="h4" component="h2" className="my-2">
                        Create User
                    </Typography>
                    <TextField label="Name" value={name} inputProps={{ style: { color: 'black' } }} onChange={handleNameChange} fullWidth />

                    <div>
                        <Checkbox checked={wazuhChecked} onChange={handleWazuhChange} name="wazuh" />
                        Wazuh
                    </div>

                    <div>
                        <Checkbox checked={gophishChecked} onChange={handleGophishChange} name="gophish" />
                        Gophish
                    </div>

                    <Button variant="contained" onClick={handleCreateUser}>
                        Create User
                    </Button>
                </div>
            </Modal>

            <style jsx>{`
                .modal-container {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    justify-content: center;
                    background-color: #fff;
                    color: black;
                    padding: 20px;
                    width: 500px;
                    height: 300px;
                    margin: 20px auto;
                    outline: none;
                    border-radius: 5px;
                }
            `}</style>
        </>
    );
};
ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
