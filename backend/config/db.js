import pg from 'pg';

const { Pool } = pg;

// Configure the PostgreSQL connection directly in the Pool constructor
const postgresClient = new Pool({
    user: 'interntech_sql_user',
    host: 'dpg-cq3tbtrqf0us73dnjej0-a.frankfurt-postgres.render.com',
    database: 'interntech_sql',
    password: '7wqaY7PHOVBcvWQdERilXGR1cJPWS1aS',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default postgresClient;