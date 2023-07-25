// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Typography, Button, Modal, Box, TextField, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { getCompaigns } from 'api/api';
// ==============================|| SAMPLE PAGE ||============================== //
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
const User = () => {
    const [data, setData] = useState([]);
    const [totalCompaign, setTotal] = useState('');
    const [editCost, setEditCost] = useState(false);
    const [name, setName] = useState('');
    useEffect(() => {
        getCompaigns()
            .then((res) => {
                setData(res.data);
                setTotal(res.data.length);
                console.log('Compaign', res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        // axios
        //     .get('http://192.168.1.99:1338/getUser')
        //     .then((res) => {
        //         // setData(res.data.users);
        //         // console.log(userData);
        //         console.log(res.data.users);
        //         const user = JSON.parse(localStorage.getItem('userdata'));
        //         console.log(user);
        //         setName(user.username);
        //         const result = res.data.users?.filter((e) => e.name === user.username);
        //         // setData(result)
        //         console.log(result);
        //         // axios
        //         //     .get(`http://192.168.1.99:1338/getCompaign/${JSON.parse(localStorage.getItem('userdata'))?.gophishkey}`, {
        //         //         gophishapikey: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
        //         //     })

        //     })
        //     .catch((err) => {
        //         window.alert('Something went wrong');
        //     });
        // setData(JSON.parse(localStorage.getItem('userdata')));
        // console.log(JSON.parse(localStorage.getItem('Users')));
    }, []);

    return (
        <>
            <MainCard title="User Management">
                {/* <Typography variant="body2" style={{ color: 'black ' }}>
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography> */}
                <span>
                    Cost Per Agent : <b>$12</b>
                </span>{' '}
                &nbsp;&nbsp;&nbsp;
                <span>
                    Cost Per Compaign : <b>$15</b>
                </span>
                <Button style={{ float: 'right' }} variant="outlined" onClick={() => setEditCost(true)}>
                    Edit Cost
                </Button>
                <Modal
                    open={editCost}
                    onClose={() => {
                        setEditCost(false);
                    }}
                >
                    <Box sx={style}>
                        <h4>Edit Cost</h4>
                        <TextField
                            label="Cost Per Agent"
                            // value={name}
                            // onChange={handleNameChange}
                            type="number"
                            fullWidth
                            // inputProps={{ style: { color: 'black' } }}
                            className="my-2"
                        />
                        <br />
                        <TextField
                            label="Cost Per Compaign"
                            // value={name}
                            type="number"
                            // onChange={handleNameChange}
                            fullWidth
                            // inputProps={{ style: { color: 'black' } }}
                            className="my-2"
                        />
                        <br />
                        <Button variant="contained" onClick={() => setEditCost(false)}>
                            Update Cost
                        </Button>
                    </Box>
                </Modal>
                <table className="table table-hover mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <td>S.No</td>
                            <td>User Name</td>
                            {/* <td>Start Date</td>
                            <td>Last Paid Date</td>
                            <td>Total Agents</td> */}
                            <td>Total Compaign</td>
                            <td>Total Cost (Last 30 Days)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <td>1</td>
                        <td>{JSON.parse(localStorage.getItem('userdata'))?.username}</td>
                        <td>{totalCompaign}</td>
                        <td>${totalCompaign * 15}</td>
                        {/* {data?.length > 0 &&
                            data?.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{JSON.parse(localStorage.getItem('userdata'))?.username}</td>

                                        <td>{data?.length}</td>
                                        <td>{data?.length * 15}$</td> 
                                    </tr>
                                );
                            })}*/}
                    </tbody>
                </table>
            </MainCard>
        </>
    );
};
export default User;
