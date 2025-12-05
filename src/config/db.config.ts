import mysql from 'mysql2/promise';
import configuration from './config.js';

const db_connection = await mysql.createConnection({
    host: configuration.db_host,
    user: configuration.db_user,
    password: configuration.db_password,
    port: configuration.db_port,
    database: configuration.db_name
})

export default db_connection;