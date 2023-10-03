import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, Modal, Box, TextField, Card, CardContent, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
// project import
import MainCard from 'components/MainCard';
import {
    createCompaign,
    createGroup,
    createTemplate,
    deleteCompaign,
    deleteGroup,
    getCompaigns,
    getGroups,
    getGroupsSummary,
    getPages,
    getSendingProfile,
    getTemplates
} from 'api/api';
import Swal from 'sweetalert2';

const newstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

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
export default function Compaigns() {
    const [open, setOpen] = React.useState(false);
    const [copyModal, setCopyModal] = React.useState(false);
    const [testEmailopen, setTestEmailopen] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [name, setName] = React.useState('');
    const [todos, setTodos] = useState([]);
    const [envelopSender, setEnvelopSender] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [emailTemplate, setEmailTemplate] = useState('');
    const [lPage, setLPage] = useState('');
    const [url, setURL] = useState('');
    const [lDate, setLDate] = useState('');
    const [sendEmails, setSendEmails] = useState('');
    const [sendProfile, setSendProfile] = useState('');
    const [group, setGroup] = useState('');

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [templates, setTemplates] = React.useState([]);
    const [pages, setPages] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [sendingProfile, setSendingProfile] = React.useState([]);
    const [data, setData] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setName('');
        setEmailTemplate('');
        setLPage('');
        setURL('');
        setLDate('');
        setSendEmails('');
        setSendProfile('');
        setGroup('');
        setCopyModal(false);
    };
    const handleCheckClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        setOpen(false);
        if (name === '' || emailTemplate === '' || url === '' || lPage === '' || sendProfile === '' || group === '') {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
        } else {
            const date = new Date(lDate);
            if (sendEmails) {
                var send_by_date = new Date(sendEmails);
                console.log(sendEmails);
                var sendDate = new Date(send_by_date.getTime() + send_by_date.getTimezoneOffset() * 60000);
            }

            // Convert the date to the UTC time zone
            const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            // console.log(utcDate.toISOString());
            let obj = {
                name: name,
                template: { name: emailTemplate },
                url: url,
                page: { name: lPage },
                smtp: { name: sendProfile },
                launch_date: utcDate?.toISOString(),
                // send_by_date: sendDate && sendDate.toISOString(),
                groups: [{ name: group }]
            };
            if (sendEmails) {
                obj['send_by_date'] = sendDate.toISOString();
            }
            console.log(obj);
            createCompaign(obj)
                .then((res) => {
                    console.log(res);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Compaign created successfully!',
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
        if (fname !== '' || lname !== '' || email !== '' || position !== '') {
            let todo = { first_name: fname, last_name: lname, email: email, position: position };

            setTodos([...todos, todo]);
            setFname('');
            setLname('');
            setEmail('');
            setPosition('');
        }
    }
    function handleDelete(i) {
        setTodos(todos.filter((todo, index) => index !== i));
    }

    const handleCopyModal = (e) => {
        setName(e?.name);
        setEmailTemplate(e?.template.name);
        setLPage(e?.page.name);
        setURL(e?.url);
        setLDate(e?.launch_date);
        setSendEmails(e?.send_by_date);
        setSendProfile(e?.smtp.name);
        setGroup(e?.groups?.name);
        setCopyModal(true);
    };

    const fetchUser = () => {
        setLoader(true);
        getCompaigns()
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        getTemplates()
            .then((res) => {
                console.log(res);
                setTemplates(res.data);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
        getPages()
            .then((res) => {
                console.log(res);
                setPages(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        getSendingProfile()
            .then((res) => {
                console.log(res);
                setSendingProfile(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        getGroups()
            .then((res) => {
                console.log(res);
                setGroups(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoader(false);
    };
    const handleDeleteGroup = (i) => {
        deleteCompaign(i)
            .then((res) => {
                console.log(res);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Compaign deleted successfully!',
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

    const navigate = useNavigate();
    const handleNavigate = (id) => {
        navigate(`/compaign/${id}`);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    setTimeout(() => {
        fetchUser();
    }, 900000);

    return (
        <>
            <MainCard title="Users And Groups">
                <Card sx={{ maxWidth: 275 }} className="mb-3" style={{ color: 'black' }}>
                    <CardContent>
                        <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
                            Compaign Summary
                        </Typography>
                        <Typography variant="h5" component="div" color="text.secondary">
                            Total Compaign : {data?.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" className="mb-3" onClick={handleOpen}>
                    New Compaign
                </Button>

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
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Name
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Compaign Name"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Email Template
                            </Typography>

                            <div class="col-sm-3">
                                <select
                                    type="text"
                                    class="form-control"
                                    placeholder="Select Email Template"
                                    id="firstName"
                                    onBlur={(e) => setEmailTemplate(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select Email Template
                                    </option>
                                    {templates?.map((e, i) => (
                                        <option key={i} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Landing Page
                            </Typography>
                            <div class="col-sm-3">
                                <select
                                    type="text"
                                    class="form-control"
                                    placeholder="Select Landing Page"
                                    id="firstName"
                                    onBlur={(e) => setLPage(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select Landing Page
                                    </option>
                                    {pages?.map((e, i) => (
                                        <option key={i} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                URL
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="http://192.168.0.107"
                                    id="ip"
                                    required
                                    value={url}
                                    onChange={(e) => setURL(e.target.value)}
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Launch Date
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="datetime-local"
                                    class="form-control"
                                    placeholder="Select Launch Date"
                                    id="ip"
                                    required
                                    value={lDate}
                                    onChange={(e) => setLDate(e.target.value)}
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Send Emails By (Optional)
                            </Typography>
                            <div class="col-sm-3">
                                <input
                                    type="datetime-local"
                                    class="form-control"
                                    placeholder="Select Launch Date"
                                    id="ip"
                                    value={sendEmails}
                                    onChange={(e) => setSendEmails(e.target.value)}
                                />
                            </div>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Sending Profile
                            </Typography>
                            <div class="col-sm-3">
                                <select
                                    type="text"
                                    class="form-control"
                                    placeholder="Select Landing Page"
                                    id="firstName"
                                    onBlur={(e) => setSendProfile(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select Sending Profile
                                    </option>
                                    {sendingProfile?.map((e, i) => (
                                        <option key={i} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <Button variant="contained" color="error" onClick={() => setTestEmailopen(true)}>
                                Send Test Email{' '}
                            </Button> */}
                            <Modal
                                open={testEmailopen}
                                onClose={() => setTestEmailopen(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={newstyle}>
                                    <Typography id="modal-modal-title" variant="h4" component="h2">
                                        Send Test Email
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Send Test Email to:
                                        <div className="container my-2">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <input
                                                        placeholder="First Name"
                                                        className="form-control"
                                                        onChange={(e) => setFname(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        placeholder="Last Name"
                                                        className="form-control"
                                                        onChange={(e) => setLname(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        placeholder="Email"
                                                        className="form-control"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        placeholder="Position"
                                                        className="form-control"
                                                        onChange={(e) => setPosition(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <Button variant="contained" className="mt-2">
                                                Send
                                            </Button>
                                        </div>
                                    </Typography>
                                </Box>
                            </Modal>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Groups
                            </Typography>
                            <div class="col-sm-3">
                                <select
                                    type="text"
                                    class="form-control"
                                    placeholder="Select Landing Page"
                                    id="firstName"
                                    onBlur={(e) => setGroup(e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select Group
                                    </option>
                                    {groups?.map((e, i) => (
                                        <option key={i} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Position"
                                    id="position"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </div> */}
                            {/* <Button variant="text" color="error" size="small" onClick={handleSubmit}>
                                <AddIcon fontSize="small" /> Add
                            </Button> */}

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd'
                                    // color: "black"
                                }}
                                onClick={handleAdd}
                                fullWidth
                            >
                                Create Template
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <table className="table table-hover mt-4">
                    <thead class="thead-dark">
                        <tr>
                            <td>Name</td>

                            <td>Created Date</td>
                            <td>Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.name}</td>

                                    <td>{new Date(e.created_date).toUTCString()}</td>
                                    <td>{e.status}</td>
                                    <td>
                                        <IconButton>
                                            <VisibilityIcon color="primary" onClick={() => handleNavigate(e.id)} />
                                        </IconButton>
                                        <IconButton>
                                            <ContentCopyIcon color="primary" onClick={() => handleCopyModal(e)} />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon color="error" onClick={() => handleDeleteGroup(e.id)} />
                                        </IconButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {loader && <h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                {data?.length < 1 && <h5 style={{ textAlign: 'center' }}>No Data Found</h5>}
            </MainCard>

            <Modal open={copyModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '41ch' }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Name
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="Compaign Name"
                            variant="outlined"
                            style={{ color: 'black' }}
                            color="primary"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Email Template
                        </Typography>

                        <div class="col-sm-3">
                            <select
                                type="text"
                                class="form-control"
                                placeholder="Select Email Template"
                                id="firstName"
                                value={emailTemplate}
                                onBlur={(e) => setEmailTemplate(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select Email Template
                                </option>
                                {templates?.map((e, i) => (
                                    <option key={i} value={e.name}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Landing Page
                        </Typography>
                        <div class="col-sm-3">
                            <select
                                type="text"
                                class="form-control"
                                placeholder="Select Landing Page"
                                id="firstName"
                                value={lPage}
                                onBlur={(e) => setLPage(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select Landing Page
                                </option>
                                {pages?.map((e, i) => (
                                    <option key={i} value={e.name}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            URL
                        </Typography>
                        <div class="col-sm-3">
                            <input
                                type="email"
                                class="form-control"
                                placeholder="http://192.168.0.107"
                                id="ip"
                                required
                                value={url}
                                onChange={(e) => setURL(e.target.value)}
                            />
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Launch Date
                        </Typography>
                        <div class="col-sm-3">
                            <input
                                type="datetime-local"
                                class="form-control"
                                placeholder="Select Launch Date"
                                id="ip"
                                required
                                value={lDate}
                                onChange={(e) => setLDate(e.target.value)}
                            />
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Send Emails By (Optional)
                        </Typography>
                        <div class="col-sm-3">
                            <input
                                type="datetime-local"
                                class="form-control"
                                placeholder="Select Launch Date"
                                id="ip"
                                value={sendEmails}
                                onChange={(e) => setSendEmails(e.target.value)}
                            />
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Sending Profile
                        </Typography>
                        <div class="col-sm-3">
                            <select
                                type="text"
                                class="form-control"
                                placeholder="Select Landing Page"
                                id="firstName"
                                value={sendProfile}
                                onBlur={(e) => setSendProfile(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select Sending Profile
                                </option>
                                {sendingProfile?.map((e, i) => (
                                    <option key={i} value={e.name}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <Button variant="contained" color="error" onClick={() => setTestEmailopen(true)}>
                                Send Test Email{' '}
                            </Button> */}
                        <Modal
                            open={testEmailopen}
                            onClose={() => setTestEmailopen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={newstyle}>
                                <Typography id="modal-modal-title" variant="h4" component="h2">
                                    Send Test Email
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Send Test Email to:
                                    <div className="container my-2">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input
                                                    placeholder="First Name"
                                                    className="form-control"
                                                    onChange={(e) => setFname(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    placeholder="Last Name"
                                                    className="form-control"
                                                    onChange={(e) => setLname(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    placeholder="Email"
                                                    className="form-control"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input
                                                    placeholder="Position"
                                                    className="form-control"
                                                    onChange={(e) => setPosition(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <Button variant="contained" className="mt-2">
                                            Send
                                        </Button>
                                    </div>
                                </Typography>
                            </Box>
                        </Modal>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Groups
                        </Typography>
                        <div class="col-sm-3">
                            <select
                                type="text"
                                class="form-control"
                                placeholder="Select Landing Page"
                                id="firstName"
                                value={group}
                                onBlur={(e) => setGroup(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select Group
                                </option>
                                {groups?.map((e, i) => (
                                    <option key={i} value={e.name}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Position"
                                    id="position"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </div> */}
                        {/* <Button variant="text" color="error" size="small" onClick={handleSubmit}>
                                <AddIcon fontSize="small" /> Add
                            </Button> */}

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#70d8bd'
                                // color: "black"
                            }}
                            onClick={handleAdd}
                            fullWidth
                        >
                            Create Template
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
