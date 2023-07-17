import { promisePool } from '../db.js';

const studentModel = {
  async createStudent({ name, idNumber, course, level }) {
    try {
      const query = `
      INSERT INTO student(name, idNumber, course, level) 
      VALUES(?, ?, ?, ?);
    `;
      const conn = await promisePool.getConnection();
      const [data] = await conn.execute(query, [name, idNumber, course, level]);
      conn.release();
      // similar a:
      // const [data] = await promisePool.execute(query, [name, idNumber, course, level]);
      return data;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') return 'User already exists'; // opcional
      return null;
    }
  },

  async getStudent(idNumber) {
    try {
      const query = 'SELECT * FROM student WHERE idNumber = ? AND state = 1;';
      const [rows] = await promisePool.execute(query, [idNumber]);

      return rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getAllStudents() {
    try {
      const query = 'SELECT * FROM student WHERE state = 1';
      const [rows] = await promisePool.execute(query);
      return rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async updateStudent({ currentIdNumber, updatedData }) {
    try {
      const { name, idNumber, course, level } = updatedData;

      const query = `
        UPDATE student
        SET name = ?, idNumber = ?, course = ?, level = ?
        WHERE idNumber = ? AND state = 1;
      `;

      const [data] = await promisePool.execute(query, [
        name,
        idNumber,
        course,
        level,
        currentIdNumber,
      ]);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteStudent(idNumber) {
    try {
      const query = `
        DELETE FROM student 
        WHERE idNumber = ? AND state = 1;
      `;

      const [data] = await promisePool.execute(query, [idNumber]);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default studentModel;
