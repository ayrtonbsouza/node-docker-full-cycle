'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(nome) values('Ayrton')`
connection.query(sql)

// App
const app = express();
app.get('/', (req, res) => {

  const query = 'SELECT nome FROM people';
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);

    let html = '<h1>Full Cycle</h1>';
    rows.forEach((row) => {
      html = html + '<p>' + row.nome + '</p>';
    });

    res.send(html);
  });

  //res.send('<h1>Full Cycle</h1>');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
