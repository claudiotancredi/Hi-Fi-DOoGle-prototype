'use strict'
const sqlite = require('sqlite3')

const db = new sqlite.Database(
    'dboogle.db',
    (error) => {
        if (error) throw error;
    }
)
module.exports = db