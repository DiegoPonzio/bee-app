import { createPool } from "mysql2/promise";

const pool = createPool({
    host: 'containers-us-west-50.railway.app',
    user: 'root',
    password: 'B5By61OXj2xEiSGpeTRu',
    port: 5903,
    database: 'railway'
})

export { pool };