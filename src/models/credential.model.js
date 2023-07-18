import { promisePool } from '../db.js';

const credentialModel = {
  async createcredential({ email, hashed_password }) {
    try {
      const query = `
        INSERT INTO credential (user, password)
        VALUES (?, ?)
      `;
      const [result] = await promisePool.execute(query, [email, hashed_password]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export { credentialModel };
