"use strict";

const { default: mongoose } = require("mongoose");
const {
  db: { userName, password },
} = require("../configs/mongo.config");
const connectString = `mongodb+srv://${userName}:${password}@cluster0.jmoxqb2.mongodb.net/graduation?retryWrites=true&w=majority&appName=Cluster0`;

class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then((_) => console.log("connect mongo success"))
      .catch((error) => console.log("error"));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
