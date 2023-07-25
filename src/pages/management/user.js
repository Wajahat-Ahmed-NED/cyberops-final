// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Typography, Button, Box, TextField, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { Modal, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { createPortalUser, getPortalUsers, deletePortalUser } from 'api/api';
// ==============================|| SAMPLE PAGE ||============================== //
//const [userData, setUserData] = useState([]);
const User = () => {
    //const [userData, setUserData] = useState([]);

    const [data, setData] = useState([]);
    const getUsers = () => {
        getPortalUsers()
            .then((res) => {
                // console.log(res.data)
                setData(res.data.users);
                // console.log(userData);
            })
            .catch((err) => {
                window.alert('Something went wrong');
            });
        console.log(data);
    };
    useEffect(() => {
        // setData(JSON.parse(localStorage.getItem('Users')));
        // console.log(JSON.parse(localStorage.getItem('Users')));
        //3fa328ea61533b6be5d27a92ba7880548db0fd84 -- comit log
        getUsers();
    }, []);

    const [modal, setModal] = useState(false);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleModal = () => {
        setModal(!modal);
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setCPassword] = useState('');

    const [name, setName] = useState('');
    const [wazuhChecked, setWazuhChecked] = useState(false);
    const [gophishChecked, setGophishChecked] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleCPasswordChange = (event) => {
        setCPassword(event.target.value);
    };

    const handleWazuhChange = (event) => {
        setWazuhChecked(event.target.checked);
    };

    const handleGophishChange = (event) => {
        setGophishChecked(event.target.checked);
    };
    const handleDeleteUser = (uname, auther) => {
        console.log(uname, auther);
        deletePortalUser(uname, auther)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User Deleted successfully!',
                    showConfirmButton: true
                });
                getUsers();
            })
            .catch((error) => {
                Swal.fire('Oops', 'Something went wrong', 'error');
            });
    };

    const handleCreateUser = () => {
        if (!email || !password || !name || !confirmpassword || (!wazuhChecked && !gophishChecked)) {
            window.alert('Please fill all the details');
        } else {
            if (password == confirmpassword) {
                const user = {
                    email,
                    password,
                    name,
                    wazuh: wazuhChecked,
                    gophish: gophishChecked,
                    type: 'user',
                    auth: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
                };
                createPortalUser(user)
                    .then((res) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'User Created successfully!',
                            showConfirmButton: true
                        });
                        getUsers();
                        setModal(!modal);
                    })
                    .catch((error) => {
                        Swal.fire('Oops', error.response.data, 'error');
                    });
            } else {
                window.alert('Password and Confirm Password must be same');
            }
        }
    };
    return (
        <>
            <MainCard title="User Management">
                <Button variant="contained" onClick={handleModal}>
                    Create User
                </Button>
                <Modal open={modal} onClose={handleModal}>
                    <div
                        style={{
                            height: '500px'
                        }}
                        className="modal-container"
                    >
                        <Typography variant="h4" component="h2" className="my-2">
                            Create User
                        </Typography>
                        <TextField
                            label="Name"
                            value={name}
                            inputProps={{ style: { color: 'black' } }}
                            onChange={handleNameChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            label="Email"
                            value={email}
                            inputProps={{ style: { color: 'black' } }}
                            onChange={handleEmailChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            type="Password"
                            label="Password"
                            value={password}
                            inputProps={{ style: { color: 'black' } }}
                            onChange={handlePasswordChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            type="Password"
                            label="Confirm Password"
                            value={confirmpassword}
                            inputProps={{ style: { color: 'black' } }}
                            onChange={handleCPasswordChange}
                            fullWidth
                        />
                        <br />

                        <Typography variant="h4" component="h2" className="my-2">
                            Select Services
                        </Typography>
                        <div>
                            <Checkbox checked={wazuhChecked} onChange={handleWazuhChange} name="wazuh" />
                            Wazuh
                            <Checkbox checked={gophishChecked} onChange={handleGophishChange} name="gophish" />
                            Gophish
                        </div>
                        <br />
                        <Button fullWidth variant="contained" onClick={handleCreateUser}>
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
                <table className="table table-hover mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <td>S.No</td>
                            <td>Name</td>
                            <td>Username/Email</td>
                            <td>Resources</td>
                            <td>Gophish Id</td>
                            <td>GoPhish API Key</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 &&
                            data?.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{e.name}</td>
                                        <td>{e.username}</td>
                                        <td>
                                            {/* {e.wazuh && <li>Wazuh</li>} */}
                                            {e.gophish && <li>Gophish</li>}
                                        </td>
                                        <td>{e.gophishId}</td>
                                        <td>{e.gophishapikey}</td>
                                        <td>
                                            {/* <IconButton onClick={() => alert('Edited Successfully But No Backend')}>
                                                <EditIcon color="success" />
                                            </IconButton> */}
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteUser(e?.gophishId, JSON.parse(localStorage.getItem('userdata'))?.gophishkey)
                                                }
                                            >
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </MainCard>
        </>
    );
};
export default User;
