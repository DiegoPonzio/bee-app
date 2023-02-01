import { createPool } from "mysql2/promise";

const pool = createPool({
    host: 'containers-us-west-50.railway.app',
    user: 'root',
    password: 'v4IGRQuAQXqGNGzzuAox',
    port: 5903,
    database: 'railway'
})

export { pool };