import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, Modal, Box, TextField, Card, CardContent, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
// project import
import MainCard from 'components/MainCard';

import DOMPurify from 'dompurify';
import {
    createGroup,
    createPage,
    createTemplate,
    deleteGroup,
    deletePage,
    editPage,
    getGroups,
    getGroupsSummary,
    getPages,
    getTemplates,
    importSite
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
    maxHeight: '600px',
    boxShadow: 24,
    p: 4,
    overflowX: 'hidden',
    overflowY: 'auto'
    // minHeight: "400px",
    // maxHeight: "600px",
};
export default function LandingPage() {
    const [open, setOpen] = React.useState(false);
    const [imports, setImport] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [copyModal, setCopyModal] = React.useState(false);
    const [name, setName] = React.useState('');
    const [textUrl, setTextUrl] = React.useState('');
    const [todos, setTodos] = useState([]);
    const [envelopSender, setEnvelopSender] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [id, setId] = useState(0);
    const [position, setPosition] = useState('');
    const [data, setData] = React.useState([]);
    const [groupSummary, setGroupSummary] = React.useState([]);
    const [editData, setEditData] = React.useState({});
    const [captureData, setCaptureData] = React.useState(true);
    const [redirectURL, setRedirectURL] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setEditModal(false);
        setText('');
        setId(0);
        setName('');
        setEditData({});
        setCopyModal(false);
    };
    const handleCheckClose = () => {
        setOpen(false);
    };
    const handleEdit = () => {
        setEditModal(false);
        if (name === '' || text === '') {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
        } else {
            let obj = {
                ...editData,
                name: name,
                html: text,
                capture_credentials: captureData ? true : false,
                capture_passwords: captureData ? true : false,
                redirect_url: redirectURL
            };
            console.log(obj);
            console.log(typeof id);
            editPage(obj, id)
                .then((res) => {
                    console.log(res);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Page Updated Successfully!',
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
    const handleAdd = () => {
        setOpen(false);

        if (name === '' || text === '') {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
        } else {
            let obj = {
                name: name,
                text: text,
                capture_credentials: captureData ? true : false,
                capture_passwords: captureData ? true : false,
                redirect_url: redirectURL
            };
            console.log(obj);
            createPage(obj)
                .then((res) => {
                    console.log(res);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Page created successfully!',
                        showConfirmButton: true,
                        timer: 2000
                    });
                    fetchUser();
                    handleClose();
                    setImport(false);
                })
                .catch((err) => {
                    console.log(err);
                    handleCheckClose();
                    Swal.fire('Failed', err.response.data.message, 'error');
                });
        }
    };

    function stringToHtml(htmlString) {
        const sanitizedHtml = DOMPurify.sanitize(htmlString);
        return <div id="summary1" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    }

    const handleImportSite = () => {
        if (textUrl === '') {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
            return;
        }
        let obj = {
            include_resources: false,
            url: textUrl
        };
        importSite(obj)
            .then((res) => {
                console.log(res.data);
                setText(res?.data.html);
            })
            .catch((err) => {
                console.log(err);
                handleCheckClose();
                Swal.fire('Failed', err.response.data.message, 'error');
            });
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
    const fetchUser = () => {
        getPages()
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDeleteGroup = (i) => {
        deletePage(i)
            .then((res) => {
                console.log(res);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Page deleted successfully!',
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

    const handleEditModal = (e, entry) => {
        if (entry == 'copy') {
            setCopyModal(true);
            setName(e?.name);
            setText(e?.html);
            setId(e?.id);
            setEditData(e);
        } else {
            setEditModal(true);
            setName(e?.name);
            setText(e?.html);
            setId(e?.id);
            setEditData(e);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <MainCard title="Users And Groups">
                <Card sx={{ maxWidth: 275 }} className="mb-3" style={{ color: 'black' }}>
                    <CardContent>
                        <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
                            Landing Page Summary
                        </Typography>
                        <Typography variant="h5" component="div" color="text.secondary">
                            Total Pages : {data?.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" className="mb-3" onClick={handleOpen}>
                    New Page
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
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Name
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Landing Page"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Button variant="contained" color="error" onClick={() => setImport(!imports)}>
                                Import Site
                            </Button>

                            {imports && (
                                <>
                                    <Typography id="modal-modal-title" variant="h4" component="h2">
                                        Enter URL
                                    </Typography>
                                    <div class="col-sm-3">
                                        <textarea
                                            type="email"
                                            class="form-control"
                                            placeholder="http://google.com"
                                            id="url"
                                            required
                                            rows={1}
                                            value={textUrl}
                                            onChange={(e) => setTextUrl(e.target.value)}
                                        />
                                        <Button variant="contained" color="success" onClick={() => handleImportSite()}>
                                            Save{' '}
                                        </Button>
                                    </div>
                                </>
                            )}

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                HTML
                            </Typography>
                            <div class="col-sm-3">
                                <textarea
                                    type="email"
                                    class="form-control"
                                    placeholder="HTML"
                                    id="email"
                                    required
                                    rows={7}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Rendered HTML
                            </Typography>
                            {text && stringToHtml(text)}

                            <br />
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Redirect URL
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Redirect URL"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                value={redirectURL}
                                onChange={(e) => setRedirectURL(e.target.value)}
                            />

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={captureData}
                                    id="flexCheckChecked"
                                    onChange={(e) => setCaptureData(!captureData)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Capture Submitted Data
                                </label>
                            </div>

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd',
                                    // color: "black"
                                    marginRight: '-20px'
                                }}
                                onClick={handleAdd}
                                // fullWidth
                            >
                                Create Page
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <table className="table table-hover mt-4">
                    <thead class="thead-dark">
                        <tr>
                            <td>Name</td>
                            <td>Redirect URL</td>
                            <td>Captured Credentials</td>
                            <td>Captured Password</td>
                            <td>Modified Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.redirect_url !== '' ? e.redirect_url : 'None'}</td>
                                    <td>{e.capture_credentials === false ? 'False' : 'True'}</td>
                                    <td>{e.capture_passwords === false ? 'False' : 'True'}</td>
                                    <td>{new Date(e.modified_date).toLocaleDateString()}</td>
                                    <td>
                                        {/* <EditIcon color="success" /> */}
                                        <IconButton onClick={() => handleEditModal(e, 'edit')}>
                                            <EditIcon color="success" />
                                            {/* <DeleteIcon color="error" /> */}
                                        </IconButton>
                                        <IconButton onClick={() => handleEditModal(e, 'copy')}>
                                            <ContentCopyIcon color="primary" />
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
                                Name
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Landing Page"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                HTML
                            </Typography>
                            <div class="col-sm-3">
                                <textarea
                                    type="email"
                                    class="form-control"
                                    placeholder="HTML"
                                    id="email"
                                    required
                                    rows={7}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Rendered HTML
                            </Typography>
                            {text && stringToHtml(text)}

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Redirect URL
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Redirect URL"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                value={redirectURL || editData.redirect_url}
                                onChange={(e) => setRedirectURL(e.target.value)}
                            />

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={editData.capture_credentials}
                                    id="flexCheckChecked"
                                    onChange={(e) => setCaptureData(!editData.capture_credentials)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Capture Submitted Data
                                </label>
                            </div>

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd',
                                    // color: "black"
                                    marginRight: '-20px'
                                }}
                                onClick={handleEdit}
                                // fullWidth
                            >
                                Update Page
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal
                    open={copyModal}
                    onClose={() => {
                        setCopyModal(false);
                    }}
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
                                Name
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Landing Page"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                HTML
                            </Typography>
                            <div class="col-sm-3">
                                <textarea
                                    type="email"
                                    class="form-control"
                                    placeholder="HTML"
                                    id="email"
                                    required
                                    rows={7}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Rendered HTML
                            </Typography>
                            {text && stringToHtml(text)}

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Redirect URL
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Redirect URL"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                value={redirectURL || editData.redirect_url}
                                onChange={(e) => setRedirectURL(e.target.value)}
                            />

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={editData.capture_credentials}
                                    id="flexCheckChecked"
                                    onChange={(e) => setCaptureData(!editData.capture_credentials)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Capture Submitted Data
                                </label>
                            </div>

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd',
                                    // color: "black"
                                    marginRight: '-20px'
                                }}
                                onClick={handleAdd}
                                // fullWidth
                            >
                                Create Page
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </MainCard>
        </>
    );
}
