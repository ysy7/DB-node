const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const dbConfig = {
  user: 'nodetest',
  password: '1234',
  connectString: 'your_connection_string'
};

app.use(bodyParser.json());

// 회원가입 라우트
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const insertQuery = `
      INSERT INTO users (id, username, password)
      VALUES (user_seq.NEXTVAL, :username, :password)
    `;
    const bindParams = {
      username,
      password
    };

    const result = await connection.execute(insertQuery, bindParams, { autoCommit: true });
    await connection.close();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
