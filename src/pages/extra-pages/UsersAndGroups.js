import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, Modal, Box, TextField, Card, CardContent, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// project import
import MainCard from 'components/MainCard';
import { createGroup, deleteGroup, editGroup, getGroups, getGroupsSummary } from 'api/api';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '33%',
    maxHeight: '500px',
    bgcolor: 'rgb(36, 41, 57)',
    color: 'white !important',

    boxShadow: 24,
    p: 4,
    overflowX: 'hidden',
    overflowY: 'auto'
    // minHeight: "400px",
    // maxHeight: "600px",
};
export default function UsersAndGroups() {
    const [open, setOpen] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [todos, setTodos] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [data, setData] = React.useState([]);
    const [groupSummary, setGroupSummary] = React.useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    // submit
    const [excelData, setExcelData] = useState(null);
    // it will contain array of objects

    // handle File
    const fileType = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const handleFile = (e) => {
        setExcelData(null);
        let selectedFile = e.target.files[0];
        console.log(selectedFile);
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                };
            } else {
                setExcelFileError('Please select only csv/excel file types');
                setExcelFile(null);
            }
        } else {
            console.log('plz select your file');
        }
    };

    // submit function
    const handleExcelSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(data);
            setExcelData(data);
        } else {
            setExcelData(null);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setEditModal(false);
        setTodos([]);
        setExcelData(null);
        setName('');
    };
    const handleCheckClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        setOpen(false);
        if (name === '' || (todos.length < 1 && excelData === null)) {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
        } else {
            let obj = {
                name: name,
                targets: [...todos, ...(excelData || [])]
            };
            console.log(obj);
            createGroup(obj)
                .then((res) => {
                    console.log(res);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Group created successfully!',
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
    const fetchUser = () => {
        getGroups()
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        getGroupsSummary()
            .then((res) => {
                console.log(res.data);
                setGroupSummary(res.data);
            })
            .catch((err) => console.log(err));
    };
    const handleDeleteGroup = (i) => {
        deleteGroup(i)
            .then((res) => {
                console.log(res);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Group deleted successfully!',
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

    const handleEditModal = (e) => {
        setEditModal(true);
        setName(e?.name);
        setTodos(e?.targets);
        setId(e?.id);
        // setEditData(e);
    };

    const handleEdit = () => {
        setEditModal(false);
        if (name === '' || (todos.length < 1 && excelData === null)) {
            Swal.fire('Invalid Data', 'Fill all fields!', 'error');
            setOpen(true);
        } else {
            let obj = {
                id: id,
                name: name,
                targets: [...todos, ...(excelData || [])]
                // ...editData
            };
            console.log(obj);
            // console.log(typeof id);
            editGroup(obj, id)
                .then((res) => {
                    console.log(res);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Group Updated Successfully!',
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

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <MainCard title="Users And Groups">
                <Card sx={{ maxWidth: 275 }} className="mb-3" style={{ color: 'black' }}>
                    <CardContent>
                        <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
                            Groups Summary
                        </Typography>
                        <Typography variant="h5" component="div" color="text.secondary">
                            Total Groups : {groupSummary?.total}
                        </Typography>
                        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary.dark">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography> */}
                    </CardContent>
                </Card>
                <Button variant="contained" className="mb-3" onClick={handleOpen}>
                    New Group
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

                            <div className="container">
                                {/* upload file section */}
                                <div className="form">
                                    <form className="form-group" autoComplete="off">
                                        <label htmlFor="bulk">
                                            <h5>Bulk Import</h5>
                                        </label>
                                        <br></br>
                                        <input type="file" className="form-control" onChange={handleFile} required></input>
                                        {excelFileError && (
                                            <div className="text-danger" style={{ marginTop: 5 + 'px' }}>
                                                {excelFileError}
                                            </div>
                                        )}
                                        <Button
                                            onClick={(e) => {
                                                excelFile && handleExcelSubmit(e);
                                            }}
                                            fontSize="small"
                                            color="success"
                                            style={{ marginTop: 5 + 'px' }}
                                        >
                                            {excelData ? 'Uploaded' : 'Upload'}
                                        </Button>
                                    </form>
                                </div>
                            </div>

                            <TextField
                                id="outlined-basic"
                                label="Group Name"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Users
                            </Typography>

                            <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="First Name"
                                    id="firstName"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </div>
                            <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Last Name"
                                    id="lastName"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </div>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Position"
                                    id="position"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </div>
                            <Button variant="text" color="error" size="small" onClick={handleSubmit}>
                                <AddIcon fontSize="small" /> Add
                            </Button>

                            {todos?.map((e, index) => (
                                <div class="accordion accordion-flush border rounded" key={index} id="accordionFlushExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#flush-collapse${index}`}
                                                aria-expanded="false"
                                                aria-controls={`flush-collapse${index}`}
                                            >
                                                <div className="d-flex justify-content-between " style={{ width: '100%' }}>
                                                    <>
                                                        <span className="mt-3">{index + 1}</span>
                                                        <p style={{ fontWeight: 'bold' }} className="mt-3">
                                                            {e.first_name + ' ' + e.last_name}
                                                        </p>
                                                        {/* <p className="mt-3">{}</p> */}
                                                    </>
                                                    {/* <p className="mt-3">{e.cvss || e.cvss_score}</p> */}
                                                    <Button
                                                        variant="text"
                                                        color="error"
                                                        className="m-2"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </button>
                                        </h2>
                                        <div
                                            id={`flush-collapse${index}`}
                                            class="accordion-collapse collapse"
                                            aria-labelledby="flush-headingOne"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div class="accordion-body">{e.email + ' ' + e.position}</div>
                                        </div>
                                    </div>
                                </div>
                                // <li key={index}>
                                //     {fname} {lname} {email} {position}

                                //     <button onClick={() => handleDelete(index)}>Delete</button>
                                // </li>
                            ))}

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd'
                                    // color: "black"
                                }}
                                onClick={handleAdd}
                                fullWidth
                            >
                                Create Group
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <table className="table table-hover mt-4">
                    <thead class="thead-dark">
                        <tr>
                            <td>Name</td>
                            <td># of Members</td>
                            <td>Modified Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.targets.length}</td>
                                    <td>{new Date(e.modified_date).toUTCString()}</td>
                                    <td>
                                        <IconButton onClick={() => handleEditModal(e)}>
                                            <EditIcon color="success" />
                                            {/* <DeleteIcon color="error" /> */}
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteGroup(e?.id)}>
                                            {/* <EditIcon color="success" /> */}
                                            <DeleteIcon color="error" />
                                            {/* <DeleteIcon color="error" /> */}
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
                                label="Group Name"
                                variant="outlined"
                                style={{ color: 'black' }}
                                color="primary"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <div className="container">
                                {/* upload file section */}
                                <div className="form">
                                    <form className="form-group" autoComplete="off">
                                        <label htmlFor="bulk">
                                            <h5>Bulk Import</h5>
                                        </label>
                                        <br></br>
                                        <input type="file" className="form-control" onChange={handleFile} required></input>
                                        {excelFileError && (
                                            <div className="text-danger" style={{ marginTop: 5 + 'px' }}>
                                                {excelFileError}
                                            </div>
                                        )}
                                        <Button
                                            onClick={(e) => {
                                                excelFile && handleExcelSubmit(e);
                                            }}
                                            fontSize="small"
                                            color="success"
                                            style={{ marginTop: 5 + 'px' }}
                                        >
                                            {excelData ? 'Uploaded' : 'Upload'}
                                        </Button>
                                    </form>
                                </div>
                            </div>

                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Users
                            </Typography>

                            <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="First Name"
                                    id="firstName"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </div>
                            <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Last Name"
                                    id="lastName"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </div>
                            <div class="col-sm-3">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="col-sm-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Position"
                                    id="position"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </div>
                            <Button variant="text" color="error" size="small" onClick={handleSubmit}>
                                <AddIcon fontSize="small" /> Add
                            </Button>

                            {todos.map((e, index) => (
                                <div class="accordion accordion-flush border rounded" key={index} id="accordionFlushExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#flush-collapse${index}`}
                                                aria-expanded="false"
                                                aria-controls={`flush-collapse${index}`}
                                            >
                                                <div className="d-flex justify-content-between " style={{ width: '100%' }}>
                                                    <>
                                                        <span className="mt-3">{index + 1}</span>
                                                        <p style={{ fontWeight: 'bold' }} className="mt-3">
                                                            {e.first_name + ' ' + e.last_name}
                                                        </p>
                                                        {/* <p className="mt-3">{}</p> */}
                                                    </>
                                                    {/* <p className="mt-3">{e.cvss || e.cvss_score}</p> */}
                                                    <Button
                                                        variant="text"
                                                        color="error"
                                                        className="m-2"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </button>
                                        </h2>
                                        <div
                                            id={`flush-collapse${index}`}
                                            class="accordion-collapse collapse"
                                            aria-labelledby="flush-headingOne"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div class="accordion-body">{e.email + ' ' + e.position}</div>
                                        </div>
                                    </div>
                                </div>
                                // <li key={index}>
                                //     {fname} {lname} {email} {position}

                                //     <button onClick={() => handleDelete(index)}>Delete</button>
                                // </li>
                            ))}

                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#70d8bd'
                                    // color: "black"
                                }}
                                onClick={handleEdit}
                                fullWidth
                            >
                                Edit Group
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </MainCard>
        </>
    );
}
