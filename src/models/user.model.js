import bcrypt from 'bcrypt';
import { promisePool } from '../db.js';
import { credentialModel } from './credential.model.js';

const userModel = {
  async createuser({ name, email, password }) {
    try {
      const hashed_password = await bcrypt.hash(password, 10);

      const id_credential = await credentialModel.createcredential({
        email,
        hashed_password,
      });

      if (!id_credential) return null;

      const query = `
      INSERT INTO user(name, email, id_credential) 
      VALUES(?, ?, ?);
    `;
      const conn = await promisePool.getConnection();
      const [result] = await conn.execute(query, [name, email, id_credential]);
      conn.release();
      // similar a:
      // const [data] = await promisePool.execute(query, [name, idNumber, course, level]);
      return result;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') return error.code; // opcional
      return null;
    }
  },

  async getuser(id_user) {
    try {
      const query = 'SELECT * FROM user WHERE id_user = ?;';
      const [rows] = await promisePool.execute(query, [id_user]);

      return rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getAllusers() {
    try {
      const query = 'SELECT * FROM user';
      const [rows] = await promisePool.execute(query);
      return rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async updateuser({ id_user, updatedData }) {
    try {
      const { name, email, password } = updatedData;
      // TODOS
      // transaction -> update credential
      // hash password
      const query = `
        UPDATE user
        SET name = ?, email = ?, password = ?
        WHERE id_user = ?;
      `;

      const [data] = await promisePool.execute(query, [name, email, password, id_user]);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteuser(id_user) {
    try {
      const query = `
        DELETE FROM user 
        WHERE id_user = ?;
      `;

      const [data] = await promisePool.execute(query, [id_user]);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async loginuser({ email, password }) {
    try {
      const query = `
        SELECT user.id_user, credential.password 
        FROM user
        JOIN credential
        ON user.id_credential = credential.id_credential
        WHERE credential.user = ?;
      `;
      const [result] = await promisePool.execute(query, [email]);

      if (!result.length) return false;

      const { password: hashed_password } = result[0];

      const passwordIsValid = await bcrypt.compare(password, hashed_password);

      if (!passwordIsValid) return false;
      return result[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default userModel;
