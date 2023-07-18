import userModel from '../models/user.model.js';

async function createuser(req, res) {
  const response = {
    message: 'Creating user',
    data: null,
    error: null,
  };

  const user = req.body;
  const { name, lastname, email, idNumber } = user;

  if (!name || !lastname || !email || !idNumber) {
    response.error = 'Missing required parameters';
    return res.status(400).send(response);
  }

  const result = await userModel.createuser(user);

  if (!result) {
    response.error = 'Error creating user';
    return res.status(500).send(response);
  }

  // Evitar enviar este error en una api publica si la informacion enviada incluye email o rut
  if (result === 'User already exists') {
    response.error = result;
    return res.status(409).send(response);
  }

  response.data = result;
  return res.status(201).send(response);
}

async function getuser(req, res) {
  const response = {
    message: 'Getting user',
    data: null,
    error: null,
  };

  const { idNumber } = req.params;

  const data = await userModel.getuser(idNumber);

  if (!data) {
    response.error = 'Error getting user';
    return res.status(500).send(response);
  }

  if (data.length === 0) {
    response.error = 'User not found';
    return res.status(404).send(response);
  }

  response.data = data;
  return res.status(200).send(response);
}

async function getAllusers(req, res) {
  const response = {
    message: 'Getting all users',
    data: null,
    error: null,
  };

  const data = await userModel.getAllusers();

  if (!data) {
    response.error = 'Error getting users';
    return res.status(500).send(response);
  }

  // opcional
  if (data.length === 0) {
    response.error = 'There is no users in the database';
  }

  response.data = data;
  return res.status(200).send(response);
}

async function updateuser(req, res) {
  const response = {
    message: 'Updating user',
    data: null,
    error: null,
  };

  const currentIdNumber = req.params.idNumber;
  const updatedData = req.body;

  const { name, lastname, email, idNumber } = updatedData;
  if (!name || !lastname || !email || !idNumber) {
    response.error = 'Missing required parameters';
    return res.status(400).send(response);
  }

  const data = await userModel.updateuser({ currentIdNumber, updatedData });

  if (!data) {
    response.error = 'Error updating user';
    return res.status(500).send(response);
  }

  if (data.affectedRows === 0) {
    response.error = 'User not found';
    return res.status(409).send(response);
  }

  response.data = data;
  return res.status(200).send(response);
}

async function deleteuser(req, res) {
  const response = {
    message: 'Deleting user',
    data: null,
    error: null,
  };

  const { idNumber } = req.params;

  const data = await userModel.deleteuser(idNumber);

  if (!data) {
    response.error = 'Error deleting user';
    return res.status(500).send(response);
  }

  if (data.affectedRows === 0) {
    response.error = 'User not found';
    return res.status(409).send(response);
  }

  response.data = data;
  return res.status(200).send(response);
}

async function loginuser(req, res) {
  const response = {
    message: 'User login',
    data: null,
    error: null,
  };

  const { user, password } = req.body;

  if (!user || !password) {
    response.error = 'Missing required parameters';
    return res.status(400).send(response);
  }

  const result = await userModel.loginuser({ user, password });

  if (result === null) {
    response.error = 'Error validating user';
    return res.status(500).send(response);
  }

  if (result === false) {
    response.error = 'The user or password is incorrect';
    return res.status(401).send(response);
  }

  response.data = result;
  res.status(200).send(response);
}

export { createuser, getuser, getAllusers, updateuser, deleteuser, loginuser };