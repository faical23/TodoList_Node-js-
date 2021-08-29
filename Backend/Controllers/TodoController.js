var mysql = require('mysql');
const con = require('../DataBase/Connect')


const GetTodo = (req, res, next) => {
    let sql = `SELECT * FROM tasks`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
    res.end
};
const GetOneTodo = (req, res, next) => {
    let task = mysql.escape(req.params.task)
    let sql = `SELECT * FROM tasks WHERE Task LIKE '%${req.params.task}%'`
    con.query(sql,function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
    res.end
};
const DeleteTodo = (req, res, next) => {
    let id = mysql.escape(req.params.id)
    var sql = `DELETE FROM tasks WHERE id = ${id}`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
    res.end
};

const AddTodo = (req, res, next) => {
        let NewTask = mysql.escape(req.body.task);
        let NewDate = new Date();
        var sql = `INSERT INTO tasks (Task, date) VALUES (${NewTask},'${NewDate}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.json({message: "1 record inserted"}); 
        });
        res.end();
};
const UpdateTodo = (req, res, next) => {
    let NewUpdate = mysql.escape(req.body.task)
    let TaskId = mysql.escape(req.body.TaskId)
    var sql = `UPDATE tasks SET Task = ${NewUpdate} WHERE id = ${TaskId}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result.affectedRows + " record(s) updated");
    });
    res.end();
};






module.exports = {GetTodo,AddTodo,UpdateTodo,DeleteTodo,GetOneTodo};