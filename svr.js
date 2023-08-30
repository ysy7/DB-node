const express = require('express');
const oracledb = require('oracledb');
const path = require('path');
const static = require('serve-static');

const dbConfig = {
  user: 'nodetest',
  password: '1234',
  connectString: 'localhost:1521/xe',
  poolMax: 10,
  poolMin: 2,
  poolIncrement: 1,
  poolTimeout: 300,
  poolPingInterval: 60,
};

async function connectToOraclePool() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Oracle database connection pool has been created.');
  } catch (err) {
    console.error('Oracle database connection error:', err);
  }
}

connectToOraclePool();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', static(path.join(__dirname, 'public')));

app.post('/process/signup.html', async (req, res) => {
  try {
    const paramId = req.body.id;
    const paramPassword = req.body.password;

    const connection = await oracledb.getConnection(); // Get a connection from the pool

    const result = await connection.execute(
      'INSERT INTO users (id, password) VALUES (:id, :password)',
      [paramId, paramPassword]
    );

    console.log('Inserted successfully:', result);

    connection.release(); // Release the connection back to the pool

    res.status(200).send('<h2>User added successfully</h2>');
  } catch (err) {
    console.error('SQL execution error:', err);
    res.status(400).send('<h2>Failed to add user</h2>');
  }
});

const port = 5500;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
