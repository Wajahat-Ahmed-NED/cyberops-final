import React from 'react';
import axios from '../../node_modules/axios/index';
const https = require('https');

// const api = 'http://20.63.81.190:1338/';
// const goPhishApi = 'process.env.REACT_APP_BACKEND_API:1338/';
// const api2 = 'http://172.168.10.55:1338/';
// const token = '5b9df0f4e8295a7ba7a9a6031fb9c503d018b51e41bc60fbca14f53f929c9afc';
console.log(process.env.REACT_APP_BACKEND_API);
const api = `${process.env.REACT_APP_BACKEND_API}:1338/`; //127.0.0.1
const goPhishApi = `${process.env.REACT_APP_BACKEND_API}:1338/`; //20.63.81.190:1338
const api2 = `${process.env.REACT_APP_BACKEND_API}:1338/`;
const token = 'fd8bc15c96d3809f1b44d852936cb71394836bbf411b4d67321a3508d02862f6';
// const api = 'http://20.63.81.190:1338/';
// const goPhishApi = 'http://20.63.81.190:1338/';
// const api2 = 'http://172.168.10.55:1338/';
// const token = 'fd8bc15c96d3809f1b44d852936cb71394836bbf411b4d67321a3508d02862f6';

async function createUser(obj) {
    console.log(obj);
    return await axios.post(`${goPhishApi}createUser`, { ...obj });
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
async function deleteGroup(i) {
    console.log(i);
    return await axios.delete(`${goPhishApi}deleteGroup/${i}`);
}
async function deleteCompaign(i) {
    console.log(i);
    return await axios.delete(`${goPhishApi}deleteCompaign/${i}`);
}
async function deleteTemplate(id) {
    console.log(id);
    return await axios.delete(`${goPhishApi}deleteTemplate/${id}`);
}
async function deletePage(id) {
    console.log(id);
    return await axios.delete(`${goPhishApi}deletePage/${id}`);
}
async function deleteSendingProfile(id) {
    console.log(id);
    return await axios.delete(`${goPhishApi}deleteSendingProfile/${id}`);
}
async function deleteUser(id) {
    console.log(id);
    return await axios.delete(`${goPhishApi}deleteUser/${id}`);
}
async function getUsers() {
    return await axios.get(`${goPhishApi}getUsers`);
}
async function getGroups() {
    return await axios.get(`${goPhishApi}getGroups`);
}
async function getGroupsSummary() {
    return await axios.get(`${goPhishApi}getGroupsSummary`);
}
async function getTemplates() {
    return await axios.get(`${goPhishApi}getTemplates`);
}
async function getPages() {
    return await axios.get(`${goPhishApi}getPages`);
}
async function getSendingProfile() {
    return await axios.get(`${goPhishApi}getSendingProfile`);
}
async function getCompaigns() {
    return await axios.get(`${goPhishApi}getCompaigns`);
}
async function getCompaignResult(id) {
    return await axios.get(`${goPhishApi}getCompaignResult/${id}`);
}
async function getCompaignSummary(id) {
    return await axios.get(`${goPhishApi}getCompaignSummary/${id}`);
}
async function getCompleteCompaign(id) {
    return await axios.get(`${goPhishApi}getCompleteCompaign/${id}`);
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
    deleteUser
};
