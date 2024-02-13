const mysql = require("mysql");
require('dotenv').config();
let tries = 0;
let connection;
// Create a connection to the database
const db_connection = () => {
    connection = mysql.createConnection({
        database: process.env.DB_NAME,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT || 8080
    });

    // open the MySQL connection
    connection.connect((err) => {
        if (err) {
            console.info("Error when connecting to db: ", err);
            // show message if tries more than 10 and connection break....
            if (tries > 10) {
                console.info("Server break as max retry for mysql exhausted.");
                process.exit(21);
            }
            if (err.code == 'EHOSTUNREACH' || err.code == 'ENETUNREACH') {
                console.info("Server break as max retry for mysql exhausted.");
                process.exit(21);
            }
        } else {
            tries = 0;
            console.info("Mysql Conneted Successfully with database:- ", process.env.DB_NAME);
        }
    });
    connection.on('error', function (err) {
        console.log("[mysql error]", err);
    });
}

async function connection$(sql, arg = [], req = {}) {
    sql = sql.replace(/[\n\s]+/g, " ");//added for flatting sql query for fast compiling
    if (!connection || connection.state == 'disconnected') {
        // return await sleep(sql, arg, req); // will add logic later for try after sometime
        console.log('DB Connection Not Established Disconnected DB');
    }
    stoping = 1;//resetting counter

    return new Promise((resolve, reject) => {

        if (req.debug || req.validate_only) {
            console.info(connection.format(sql, arg));
            if (req.validate_only) {//just returning if validate flag is on
                return resolve({ fields: [], total_count: 0 });
            }
        }
        connection.query(sql, arg, async function (err, result) {
            if (err) {
                console.error('Error executing MySQL query: ' + err.stack);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return resolve({ fields: result || [], total_count: result && result.length || 0 });

        });
    });
}
global.connection$ = connection$

db_connection();
