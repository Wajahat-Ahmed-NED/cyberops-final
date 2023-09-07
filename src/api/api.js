import React from 'react';
import axios from '../../node_modules/axios/index';
const https = require('https');

// const api = 'http://20.63.81.190:1338/';
// const goPhishApi = 'http://localhost:1338/';
// const api2 = 'http://172.168.10.55:1338/';
// const token = '5b9df0f4e8295a7ba7a9a6031fb9c503d018b51e41bc60fbca14f53f929c9afc';

const api = 'http://localhost:1338/'; //127.0.0.1
const goPhishApi = 'http://localhost:1338/'; //20.63.81.190:1338
const api2 = 'http://localhost:1338/';

const token = 'fd8bc15c96d3809f1b44d852936cb71394836bbf411b4d67321a3508d02862f6';

async function createUser(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}createUser`, { ...obj });
}
async function createPortalUser(userDetails) {
    return await axios.post(`${api}createPortalUser`, { ...userDetails });
}
async function editCost(userDetails) {
    return await axios.put(`${api}editCost`, { ...userDetails });
}
async function getPortalUsers() {
    return await axios.get(`${api}getPortalUsers`);
}
async function getCost() {
    return await axios.get(`${api}getCost`);
}
async function getCampaignCostByName() {
    return await axios.get(`${api}getCampaignCostByName`);
}
async function getCampaignCost(username) {
    return await axios.get(`${api}getCampaignCost/${username}`);
}
async function deletePortalUser(id, auth) {
    return await axios.post(`${api}deletePortalUser`, {
        id,
        auth
    });
}
async function createTemplate(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}createTemplate`, { ...obj });
}
async function createGroup(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}createGroup`, { ...obj });
}
async function createPage(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}createPage`, { ...obj });
}
async function importSite(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}importSite`, { ...obj });
}
async function importEmail(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}importEmail`, { ...obj });
}
async function editPage(obj, i) {
    console.log(obj);
    return await axios.put(`${goPhishApi}editPage/${i}`, { ...obj });
}
async function editUser(obj, i) {
    console.log(obj);
    return await axios.put(`${goPhishApi}editUser/${i}`, { ...obj });
}
async function editSendingProfile(obj, i) {
    console.log(obj);
    return await axios.put(`${goPhishApi}editSendingProfile/${i}`, { ...obj });
}
async function editTemplate(obj, i) {
    console.log(obj);
    return await axios.put(`${goPhishApi}editTemplate/${i}`, { ...obj });
}
async function editGroup(obj, i) {
    console.log(obj);
    return await axios.put(`${goPhishApi}editGroup/${i}`, { ...obj });
}
async function createCompaign(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}createCompaign`, { ...obj });
}
async function createSendingProfile(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}createSendingProfile`, { ...obj });
}
async function deleteGroup(i, auth) {
    console.log(i, 'delete', auth);
    return await axios.post(`${goPhishApi}deleteGroup`, { i, auth });
}
async function deleteCompaign(id, auth) {
    return await axios.post(`${goPhishApi}deleteCompaign`, {
        id,
        auth
    });
}
//doing work
async function deleteTemplate(id, auth) {
    console.log(id);
    return await axios.post(`${goPhishApi}deleteTemplate`, {
        auth,
        id
    });
}
async function deletePage(id, auth) {
    console.log(id);
    return await axios.post(`${goPhishApi}deletePage`, {
        id,
        auth
    });
}
async function deleteSendingProfile(id, auth) {
    console.log(id);
    return await axios.post(`${goPhishApi}deleteSendingProfile`, {
        id,
        auth
    });
}
async function deleteUser(id) {
    console.log(id);
    return await axios.delete(`${goPhishApi}deleteUser/${id}`);
}
async function getUsers() {
    return await axios.get(`${goPhishApi}getUsers`);
}
//implementaiton of api based authentication
async function getGroups() {
    //console.log('api key gophish', JSON.parse(localStorage.getItem('userdata'))?.gophishkey);
    return await axios.post(`${goPhishApi}getGroups`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getGroupsSummary() {
    return await axios.post(`${goPhishApi}getGroupsSummary`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getTemplates() {
    return await axios.post(`${goPhishApi}getTemplates`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getPages() {
    return await axios.post(`${goPhishApi}getPages`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getSendingProfile() {
    return await axios.post(`${goPhishApi}getSendingProfile`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getCompaigns() {
    return await axios.post(`${goPhishApi}getCompaigns`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getCompaignResult(id) {
    return await axios.post(`${goPhishApi}getCompaignResult/${id}`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getCompaignSummary(id) {
    return await axios.post(`${goPhishApi}getCompaigSnummary/${id}`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function getCompleteCompaign(id) {
    return await axios.post(`${goPhishApi}getCompleteCompaign/${id}`, {
        Authorization: JSON.parse(localStorage.getItem('userdata'))?.gophishkey
    });
}
async function Login(username, password) {
    return await axios.post(`${api}cyberops_signin`, {
        username: username,
        password: password
    });
}

async function WazuhIntegration() {
    return await axios.post(`${api2}data`, {
        token: localStorage.getItem('siemToken')
    });
}

export {
    WazuhIntegration,
    getCampaignCostByName,
    getCost,
    getCampaignCost,
    editCost,
    importSite,
    importEmail,
    Login,
    editSendingProfile,
    editPage,
    editUser,
    editTemplate,
    editGroup,
    createUser,
    getUsers,
    createGroup,
    deleteGroup,
    getGroups,
    getGroupsSummary,
    createTemplate,
    getTemplates,
    createPage,
    getPages,
    createSendingProfile,
    getSendingProfile,
    getCompaigns,
    createCompaign,
    deleteCompaign,
    getCompaignResult,
    getCompaignSummary,
    getCompleteCompaign,
    deleteTemplate,
    deletePage,
    deleteSendingProfile,
    deleteUser,
    createPortalUser,
    getPortalUsers,
    deletePortalUser
};
