const oracledb = require('oracledb');

// Oracle 데이터베이스 연결 정보 설정
const dbConfig = {
  user: 'nodetest',
  password: '1234',
  connectString: 'localhost:1521/xe' // 예: 'localhost:1521/xe'
};

async function runQuery() {
  let connection;

  try {
    // 데이터베이스에 연결
    connection = await oracledb.getConnection(dbConfig);

    // 실행할 쿼리
    const sqlQuery = 'SELECT * FROM your_table';

    // 쿼리 실행
    const result = await connection.execute(sqlQuery);

    console.log('Query Result:', result.rows);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      try {
        // 연결 종료
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
}

runQuery();