const express = require('express');
const expenses = express.Router()
const cors = require('cors');
const mysql=require('mysql2')
expenses.use(cors());

const con = require('../connection/db')

expenses.get("/pages", (req, res) => {
    try {
        var perpageRecords = 5;
        var count = `select count(*) as data from groups_member`;
        con.query(count, (err, data) => {
            const totalRows = data[0]['data'];
            if (totalRows) {
                const totalPages = Math.ceil(totalRows / perpageRecords);
                res.status(200).send({totalPages});
            }
            else {
                res.status(422).send({ msg: err['sqlMessage'] })
            }
        })
    } catch (error) {
        res.status(401).send({ msg: error.message })
    }
});

// expenses.get("/pageExpenses/:id", (req, res) => {
//     try {
//         var perpageRecords = 5;
//         var page = 0;
//         var pageNo = req.params.id;
//         if (pageNo != 0) {
//             page = pageNo
//         } else {
//             page = 1;
//         }
//         var startFrom = parseInt((page - 1) * perpageRecords);
//         var sql = `select *  FROM groups_member LIMIT ${startFrom},${perpageRecords}`;
//         con.query(sql, (err, result) => {
//             if (result) {
//                 res.status(200).send(result)
//             }
//             else {
//                 res.status(422).send({ msg: err['sqlMessage'] })
//             }
//         });
//     } catch (error) {
//         res.status(401).send({ msg: error.message })
//     }
// });

expenses.get("/pageExpenses/:id", (req, res) => {
    try {
        var perpageRecords = 5;
        var page = 0;
        var pageNo = req.params.id;
        if (pageNo != 0) {
            page = pageNo
        } else {
            page = 1;
        }
        var startFrom = parseInt((page - 1) * perpageRecords);
        var sql = `select *  FROM ?? LIMIT ?,?`;
        var table=['groups_member',startFrom,perpageRecords]
        sql=mysql.format(sql,table);
        con.query(sql, (err, result) => {
            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(422).send({ msg: err['sqlMessage'] })
            }
        });
    } catch (error) {
        res.status(401).send({ msg: error.message })
    }
});

module.exports = expenses
