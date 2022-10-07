const mongoose = require("mongoose");

const CrudSchema = new mongoose.Schema({
  task: { type: String, required: true, trim: true },
},{timestamps:true});

const Crud = mongoose.model("Crud", CrudSchema);
module.exports = Crud;
