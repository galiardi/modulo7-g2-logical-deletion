import studentModel from '../models/student.model.js';

async function createStudent(req, res) {
  const response = {
    message: 'Creating student',
    data: null,
    error: null,
  };

  const student = req.body;
  const { name, idNumber, course, level } = student;

  if (!name || !idNumber || !course || !level) {
    response.error = 'Missing required parameters';
    return res.status(400).send(response);
  }

  const result = await studentModel.createStudent(student);

  if (!result) {
    response.error = 'Error creating student';
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

async function getStudent(req, res) {
  const response = {
    message: 'Getting student',
    data: null,
    error: null,
  };

  const { idNumber } = req.params;

  const data = await studentModel.getStudent(idNumber);

  if (!data) {
    response.error = 'Error getting student';
    return res.status(500).send(response);
  }

  if (data.length === 0) {
    response.error = 'User not found';
    return res.status(404).send(response);
  }

  response.data = data;
  return res.status(200).send(response);
}

async function getAllStudents(req, res) {
  const response = {
    message: 'Getting all students',
    data: null,
    error: null,
  };

  const data = await studentModel.getAllStudents();

  if (!data) {
    response.error = 'Error getting students';
    return res.status(500).send(response);
  }

  if (data.length === 0) {
    response.error = 'There is no users in the database';
  }

  response.data = data;
  return res.status(200).send(response);
}

async function updateStudent(req, res) {
  const response = {
    message: 'Updating student',
    data: null,
    error: null,
  };

  const currentIdNumber = req.params.idNumber;
  const updatedData = req.body;

  const { name, idNumber, course, level } = updatedData;
  if (!name || !idNumber || !course || !level) {
    response.error = 'Missing required parameters';
    return res.status(400).send(response);
  }

  const data = await studentModel.updateStudent({ currentIdNumber, updatedData });

  if (!data) {
    response.error = 'Error updating student';
    return res.status(500).send(response);
  }

  if (data.affectedRows === 0) {
    response.error = 'User not found';
    return res.status(409).send(response);
  }

  response.data = data;
  return res.status(200).send(response);
}

async function deleteStudent(req, res) {
  const response = {
    message: 'Deleting student',
    data: null,
    error: null,
  };

  const { idNumber } = req.params;

  const data = await studentModel.deleteStudent(idNumber);

  if (!data) {
    response.error = 'Error deleting student';
    return res.status(500).send(response);
  }

  if (data.affectedRows === 0) {
    response.error = 'User not found';
    return res.status(409).send(response);
  }

  response.data = data;
  return res.status(200).send(response);
}

export { createStudent, getStudent, getAllStudents, updateStudent, deleteStudent };
