import bcrypt from 'bcrypt';
import { promisePool } from '../db.js';
import { credentialModel } from './credential.model.js';

const userModel = {
  async createuser({ name, lastname, email, idNumber }) {
    try {
      const password = idNumber.split('-')[0].slice(-4);
      const hashed_password = await bcrypt.hash(password, 10);

      const id_credential = await credentialModel.createcredential({
        email,
        hashed_password,
      });

      if (!id_credential) return null;

      const query = `
      INSERT INTO user(name, lastname, email, idNumber, id_credential) 
      VALUES(?, ?, ?, ?, ?);
    `;
      const conn = await promisePool.getConnection();
      const [data] = await conn.execute(query, [
        name,
        lastname,
        email,
        idNumber,
        id_credential,
      ]);
      conn.release();
      // similar a:
      // const [data] = await promisePool.execute(query, [name, idNumber, course, level]);
      return data;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') return 'user already exists'; // opcional
      return null;
    }
  },

  async getuser(idNumber) {
    try {
      const query = 'SELECT * FROM user WHERE idNumber = ? AND state = 1;';
      const [rows] = await promisePool.execute(query, [idNumber]);

      return rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getAllusers() {
    try {
      const query = 'SELECT * FROM user WHERE state = 1';
      const [rows] = await promisePool.execute(query);
      return rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async updateuser({ currentIdNumber, updatedData }) {
    try {
      const { name, lastname, email, idNumber } = updatedData;

      const query = `
        UPDATE user
        SET name = ?, lastname = ?, email = ?, idNumber = ?
        WHERE idNumber = ? AND state = 1;
      `;

      const [data] = await promisePool.execute(query, [
        name,
        lastname,
        email,
        idNumber,
        currentIdNumber,
      ]);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteuser(idNumber) {
    try {
      const query = `
        DELETE FROM user 
        WHERE idNumber = ? AND state = 1;
      `;

      const [data] = await promisePool.execute(query, [idNumber]);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async loginuser({ user, password }) {
    try {
      const query = `
        SELECT user.id AS user_id, credential.password 
        FROM user
        JOIN credential
        ON user.id_credential = credential.id
        WHERE credential.user = ?;
      `;
      const [result] = await promisePool.execute(query, [user]);
      const { password: hashed_password } = result[0];

      const passwordIsValid = await bcrypt.compare(password, hashed_password);

      return passwordIsValid;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default userModel;
