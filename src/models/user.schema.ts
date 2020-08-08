import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const User = new Schema({
  email:String,
  password:String,
  note:[]

});

