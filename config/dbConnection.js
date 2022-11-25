import { createPool } from "mysql2/promise";

const pool = createPool({
    host: 'containers-us-west-131.railway.app',
    user: 'root',
    password: 'wB2mjoltRRgrX8Z3byOI',
    port: 7172,
    database: 'railway'
})

export { pool };