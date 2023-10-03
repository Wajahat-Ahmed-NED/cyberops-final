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
// ==============================|| SAMPLE PAGE ||============================== //
//const [userData, setUserData] = useState([]);
const GophishKey = () => {
    //const [userData, setUserData] = useState([]);

    const [data, setData] = useState([]);
    const getFetch = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_API}:1338/getGophishKey`)
            .then((res) => {
                setData(res.data.data);
                // console.log(userData);
                console.log(res.data.data);
            })
            .catch((err) => {
                window.alert('Something went wrong');
            });
        console.log(data);
    };
    useEffect(() => {
        // setData(JSON.parse(localStorage.getItem('Users')));
        // console.log(JSON.parse(localStorage.getItem('Users')));
        getFetch();
    }, []);
    const [modal, setModal] = useState(false);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const [ip, setIP] = useState('');
    const handleModal = (e) => {
        setName(e?.key);
        setIP(e?.ip);
        setModal(!modal);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setCPassword] = useState('');

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
    const handleIPChange = (event) => {
        setIP(event.target.value);
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

    const handleCreateUser = () => {
        if (!name || !ip) {
            window.alert('Please fill all the details');
        } else {
            const user = {
                key: name,
                ip
                // wazuh: wazuhChecked,
                // gophish: gophishChecked,
                // type: 'user'
            };
            console.log(user);
            // let existingUsers = JSON.parse(localStorage.getItem('Users'));
            // existingUsers ? existingUsers.push(user) : (existingUsers = [user]);
            // localStorage.setItem('Users', JSON.stringify(existingUsers));
            // console.log(user);
            // setModal(false);

            axios
                .put(`${process.env.REACT_APP_BACKEND_API}:1338/editGophishKey`, {
                    ...user
                })
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Credentials Updated Successfully!',
                        showConfirmButton: true
                    });
                    getFetch();
                    setModal(!modal);
                    // Swal.fire(res.data, 'Fill all fields!', 'error');
                })
                .catch((error) => {
                    console.log('error', error.response);
                    Swal.fire('Oops', error.response.data.message, 'error');
                });
        }
    };

    const handleEditUser = (id) => {
        axios
            .delete(`${process.env.REACT_APP_BACKEND_API}:1338/editUsers/${id}`)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User Deleted Successfully!',
                    showConfirmButton: true
                });
                getFetch();
            })
            .catch((error) => {
                // alert('Error');
                Swal.fire('Oops', error.response.data.message, 'error');

                console.log(error);
            });
    };
    return (
        <>
            <MainCard title="User Management">
                <Modal open={modal} onClose={handleModal}>
                    <div
                        style={{
                            height: '300px'
                        }}
                        className="modal-container"
                    >
                        <Typography variant="h4" component="h2" className="my-2">
                            Edit Key
                        </Typography>
                        <TextField
                            label="Gophish IP"
                            value={ip}
                            inputProps={{ style: { color: 'black' } }}
                            onChange={handleIPChange}
                            fullWidth
                        />
                        <br />
                        <br />
                        <TextField
                            label="Gophish Key"
                            value={name}
                            inputProps={{ style: { color: 'black' } }}
                            onChange={handleNameChange}
                            fullWidth
                        />
                        <br />

                        {/* <Typography variant="h4" component="h2" className="my-2">
                            Select Services
                        </Typography>
                        <div>
                            <Checkbox checked={wazuhChecked} onChange={handleWazuhChange} name="wazuh" />
                            Wazuh
                            <Checkbox checked={gophishChecked} onChange={handleGophishChange} name="gophish" />
                            Gophish
                        </div> */}
                        <br />
                        <Button fullWidth variant="contained" onClick={handleCreateUser}>
                            Update Key
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
                            <td>Gophish IP</td>
                            <td>Gophish Key</td>
                            <td>Updated At</td>
                            <td>Action</td>
                            {/* <td>Resources</td>
                            <td>GoPhish API Key</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 &&
                            data?.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{e.ip}</td>
                                        <td>{e.key}</td>
                                        <td>{e.updatedAt}</td>
                                        <td>
                                            <Button color="success" variant="outlined" onClick={() => handleModal(e)}>
                                                Edit
                                            </Button>
                                        </td>
                                        {/* <td>
                                            <ul>
                                               
                                                {e.gophish && <li>Gophish</li>}
                                            </ul>
                                        </td>
                                        <td>{e.gophishapikey}</td> */}
                                        {/* <td>
                                            <IconButton onClick={() => alert('Edited Successfully But No Backend')}>
                                                <EditIcon color="success" />
                                            </IconButton>
                                            <IconButton onClick={() => alert('Deleted Successfully But No Backend')}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </td> */}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </MainCard>
        </>
    );
};
export default GophishKey;
