import { createConnection } from 'mysql';


export const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '2212',
    database: 'library'
});