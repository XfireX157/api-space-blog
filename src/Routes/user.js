import express from 'express';
const user = express.Router();
import { registerUsers, getUsers, getUserID, loginUser } from '../Controllers/userController.js';

user
    .get('/user', getUsers)
    .get('/user/:id', getUserID)
    .post('/register', registerUsers)
    .post('/login', loginUser)

export default user;
