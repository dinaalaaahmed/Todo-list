import { prop } from "@typegoose/typegoose";
import {Entity} from 'typeorm'
@Entity()
export class User {
  @prop({ required: true })
  email: string;
  @prop({ required: true })
  password: string;
  @prop()
  note: Array<String>;


}