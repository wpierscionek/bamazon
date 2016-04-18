var mysql = require('mysql');

function (, , ) {
    var myLat = 0;
    var myLong = 0;
    var res = [];

    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'doctors'

    });

 con.connect(function (err) {
       if (err) {
           console.log(err);
       }
       console.log('connected');
   });