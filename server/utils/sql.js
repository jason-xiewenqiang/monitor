const query = require('./query');
const mysql = require('mysql');
const config = require('../config').database;
mysql.createPool(config);
const Sql = {
  queryAll: function(tb, filter, foreign) {
    //获取表的全部记录
  },
  insert: function(tb, data) {
    //插入一条记录
  },
  insertRows: function(tb, arr) {
  },
  update: function(tb, id, data) {
  },
  updateRows: function(tb, arr) {
  },
  delete: function(tb, id) {
  },
  deleteRows: function(tb, data) {
  },
  search: function(tb, data, foreign) {  
  },
};

module.exports = Sql;
