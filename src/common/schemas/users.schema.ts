import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  INVITED = "INVITED",
  INVITATION_EXPIRED = "INVITATION_EXPIRED",
}

enum UserTypes {
  ADMIN = "ADMIN",
  USER ="USER",
}

@Schema()
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  zip: string;
}

export const addressSchema = SchemaFactory.createForClass(Address);

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: Object.keys(UserTypes), default: UserTypes.ADMIN })
  type: UserTypes;

  @Prop({ type: String, enum: Object.keys(Status), default: Status.PENDING })
  status: Status;

  @Prop()
  isVerified: boolean;

  @Prop({type: addressSchema})
  address: Address;
}

export type UserDocument = User & Document;

export const userSchema = SchemaFactory.createForClass(User);
