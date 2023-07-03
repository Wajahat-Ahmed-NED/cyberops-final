// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { Typography, Button, Modal, Box, TextField, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
// ==============================|| SAMPLE PAGE ||============================== //

const User = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('Users')));
        console.log(JSON.parse(localStorage.getItem('Users')));
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
                <table className="table table-hover mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <td>S.No</td>
                            <td>Name</td>
                            <td>Resources</td>
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
                                        <td>
                                            <ul>
                                                {e.wazuh && <li>Wazuh</li>}
                                                {e.gophish && <li>Gophish</li>}
                                            </ul>
                                        </td>
                                        <td>
                                            <IconButton onClick={() => alert('Edited Successfully But No Backend')}>
                                                <EditIcon color="success" />
                                            </IconButton>
                                            <IconButton onClick={() => alert('Deleted Successfully But No Backend')}>
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
