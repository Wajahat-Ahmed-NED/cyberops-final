import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, Modal, Box, TextField, Card, CardContent, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// project import
import MainCard from 'components/MainCard';
import {
    createGroup,
    createPage,
    createSendingProfile,
    createTemplate,
    deleteGroup,
    deleteSendingProfile,
    editSendingProfile,
    getGroups,
    getGroupsSummary,
    getPages,
    getSendingProfile,
    getTemplates
} from 'api/api';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '33%',
    bgcolor: 'rgb(36, 41, 57)',
    color: 'white !important',

    boxShadow: 24,
    p: 4,
    overflowX: 'hidden',
    overflowY: 'auto',
    // minHeight: "400px",
    maxHeight: '600px'
};
export default function SendingProfile() {
    const [open, setOpen] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [editData, setEditData] = React.useState(false);
    const [name, setName] = React.useState('');
    const [headers, setHeaders] = useState([]);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [host, setHost] = useState('');
    const [fromAddress, setFromAddress] = useState('');
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [ignoreError, setIgnoreError] = useState(false);
    const [position, setPosition] = useState('');
    const [data, setData] = React.useState([]);
    const [groupSummary, setGroupSummary] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setEditModal(false);
        setName('');
    };
    const handleCheckClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        setOpen(false);
        if (name === '' || host === '' || fromAddress === '') {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
        } else {
            let obj = {
                name: name,
                host: host,
                from_address: fromAddress,
                headers: headers,
                username: userName,
                password: password,
                interface_type: 'SMTP',
                ignore_cert_errors: ignoreError
            };

            createSendingProfile(obj)
                .then((res) => {
                    console.log(res);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Profile created successfully!',
                        showConfirmButton: true,
                        timer: 2000
                    });
                    fetchUser();
                    handleClose();
                })
                .catch((err) => {
                    console.log(err);
                    handleCheckClose();
                    Swal.fire('Failed', err.response.data.message, 'error');
                });
        }
    };
    const handleEdit = () => {
        setEditModal(false);
        if (name === '' || host === '' || fromAddress === '') {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
        } else {
            let obj = {
                ...editData,
                name: name,
                host: host,
                from_address: fromAddress,
                headers: headers,
                username: userName,
                password: password,
                interface_type: 'SMTP',
                ignore_cert_errors: ignoreError
            };

            editSendingProfile(obj, editData?.id)
                .then((res) => {
                    console.log(res);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Sending Profile Updated Successfully!',
                        showConfirmButton: true,
                        timer: 2000
                    });
                    fetchUser();
                    handleClose();
                })
                .catch((err) => {
                    console.log(err);
                    handleCheckClose();
                    Swal.fire('Failed', err.response.data.message, 'error');
                });
        }
    };
    function handleSubmit(e) {
        e.preventDefault();
        if (key !== '' || value !== '') {
            let header = { key: key, value: value };

            setHeaders([...headers, header]);
            setKey('');
            setValue('');
            // setEmail('');
            // setPosition('');
        }
    }
    function handleDelete(i) {
        setHeaders(headers.filter((todo, index) => index !== i));
    }
    const fetchUser = () => {
        getSendingProfile()
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDeleteGroup = (i) => {
        deleteSendingProfile(i)
            .then((res) => {
                console.log(res);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Profile deleted successfully!',
                    showConfirmButton: true,
                    timer: 2000
                });
                fetchUser();
            })
            .catch((err) => {
                console.log(err);
                Swal.fire('Failed', err.response.data.message, 'error');
            });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        console.log(ignoreError);
    }, [ignoreError]);

    const handleEditModal = (e) => {
        setEditModal(true);
        setName(e?.name);
        setHost(e?.host);
        setFromAddress(e?.from_address);
        setUserName(e?.username);
        setPassword(e?.password);
        setIgnoreError(e?.ignore_cert_errors);
        setHeaders(e?.headers);
        setEditData(e);
    };

    return (
        <>
            <MainCard title="Users And Groups">
                <Card sx={{ maxWidth: 275 }} className="mb-3" style={{ color: 'black' }}>
                    <CardContent>
                        <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
                            Sending Profile
                        </Typography>
                        <Typography variant="h5" component="div" color="text.secondary">
                            Total Profiles : {data?.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" className="mb-3" onClick={handleOpen}>
                    New Profile
                </Button>
                {/* <Typography variant="h6" component="div" color="text.secondary">
                    If not created you can do it on gophish admin panel. This issue occurs when browser not able to verify gophish
                    self-signed SSL certificate.
                </Typography> */}

                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '41ch' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Name *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Sending Profile Name"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Host *
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Host"
                                    id="email"
                                    required
                                    value={host}
                                    onChange={(e) => setHost(e.target.value)}
                                />
                            </div>

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                From address *
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="From Address"
                                    id="email"
                                    required
                                    value={fromAddress}
                                    onChange={(e) => setFromAddress(e.target.value)}
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Interface Type
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Interface Type"
                                    id="email"
                                    required
                                    value="SMTP"
                                    disabled
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                UserName
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Username"
                                    id="email"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Password
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    id="email"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="flexCheckChecked"
                                    value={ignoreError}
                                    onChange={(e) => {
                                        // console.log(ignoreError);
                                        setIgnoreError(!ignoreError);
                                    }}
                                />
                                <label class="form-check-label " htmlFor="flexCheckChecked">
                                    Ignore Certificate Error
                                </label>
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Email Headers
                            </Typography>
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm">
                                        <input
                                            className="form-control"
                                            placeholder="X-Custom-Header"
                                            value={key}
                                            onChange={(e) => setKey(e.target.value)}
                                        />
                                    </div>
                                    <div class="col-sm">
                                        <input
                                            className="form-control"
                                            placeholder="{{.URL}}-gophish"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                    <div class="col-sm">
                                        <Button variant="contained" color="error" size="small" onClick={handleSubmit}>
                                            Add Header
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-hover mt-4" style={{ color: 'white' }}>
                                <thead class="thead-dark">
                                    <tr>
                                        <td>Headers</td>

                                        <td>Value</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {headers?.length > 0 &&
                                        headers?.map((e, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{e.key}</td>

                                                    <td>{e.value}</td>
                                                    <td>
                                                        <DeleteIcon color="error" onClick={() => handleDelete(i)} />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                            {headers?.length < 1 && <p className="text-center">No data available in table</p>}

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd'
                                    // color: "black"
                                }}
                                onClick={handleAdd}
                                fullWidth
                            >
                                Create Sending Profile
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <table className="table table-hover mt-4">
                    <thead class="thead-dark">
                        <tr>
                            <td>Name</td>

                            <td>Modified Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.name}</td>

                                    <td>{new Date(e.modified_date).toUTCString()}</td>
                                    <td>
                                        <IconButton onClick={() => handleEditModal(e)}>
                                            <EditIcon color="success" />
                                            {/* <DeleteIcon color="error" /> */}
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteGroup(e?.id)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Modal
                    open={editModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '41ch' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Name *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Sending Profile Name"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Host *
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Host"
                                    id="email"
                                    required
                                    value={host}
                                    onChange={(e) => setHost(e.target.value)}
                                />
                            </div>

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                From address *
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="From Address"
                                    id="email"
                                    required
                                    value={fromAddress}
                                    onChange={(e) => setFromAddress(e.target.value)}
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Interface Type
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Interface Type"
                                    id="email"
                                    required
                                    value="SMTP"
                                    disabled
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                UserName
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Username"
                                    id="email"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Password
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    id="email"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="flexCheckChecked"
                                    checked={ignoreError}
                                    onChange={(e) => {
                                        // console.log(ignoreError);
                                        setIgnoreError(!ignoreError);
                                    }}
                                />
                                <label class="form-check-label " htmlFor="flexCheckChecked">
                                    Ignore Certificate Error
                                </label>
                            </div>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Email Headers
                            </Typography>
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm">
                                        <input
                                            className="form-control"
                                            placeholder="X-Custom-Header"
                                            value={key}
                                            onChange={(e) => setKey(e.target.value)}
                                        />
                                    </div>
                                    <div class="col-sm">
                                        <input
                                            className="form-control"
                                            placeholder="{{.URL}}-gophish"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    </div>
                                    <div class="col-sm">
                                        <Button variant="contained" color="error" size="small" onClick={handleSubmit}>
                                            Add Header
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-hover mt-4" style={{ color: 'white' }}>
                                <thead class="thead-dark">
                                    <tr>
                                        <td>Headers</td>

                                        <td>Value</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {headers?.length > 0 &&
                                        headers?.map((e, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{e.key}</td>

                                                    <td>{e.value}</td>
                                                    <td>
                                                        <DeleteIcon color="error" onClick={() => handleDelete(i)} />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                            {headers?.length < 1 && <p className="text-center">No data available in table</p>}

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd'
                                    // color: "black"
                                }}
                                onClick={handleEdit}
                                fullWidth
                            >
                                Update Sending Profile
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </MainCard>
        </>
    );
}
