import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export interface user extends Document {
  email:String,
  password:String,
  note:Array<string>
}
