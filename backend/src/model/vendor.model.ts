import mongoose, { Document,Schema } from "mongoose";
// import bcrypt from "node_modules/bcryptjs";
// import jwt from "jsonwebtoken";

// export interface Ivendor extends Document{
//     companyName : string;
//     personInCharge:string;
//     phone:string;
//     email:string;
//     password:string
//     refreshToken?: string;

//   comparePassword(password: string): Promise<boolean>;
//   generateAccessToken(): string;
//   generateRefreshToken(): string;
// }

// const vendorShema = new mongoose.Schema<Ivendor>({
//     companyName : {type:String,required:true},
//     personInCharge:{type:String,required:true},
//     phone:{type:String,required:true},
//     email:{type:String,required:true},
//     password:{type:String,required:true},
//     refreshToken:{type:String},
// },  { timestamps: true })

// vendorShema.pre("save",async function(next){
// if(!this.isModified("password"))next()
//     //this.password means passowrd going to save in db
// this.password = await bcrypt.hash(this.password,10)
// next()
// })
// vendorShema.methods.comparePassword = async function (password : string){
//     return bcrypt.compare(password, this.password);
// }
// vendorShema.methods.generateAccessToken = async function(){
// return jwt.sign({_id : this._id,email:this.eamil},process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:"7m"})
// }
// vendorShema.methods.generateRefreshToken = async function (){
// return jwt.sign({_id:this._id,email:this.eamil},process.env.REFRESH_TOKEN_SECRET as string,{expiresIn:"15m"})
// }

// export const User = mongoose.model<Ivendor>("Vendor", vendorShema);

const vendorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    businessName: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: { type: [Number] } // [longitude, latitude]
    },
    rating: { type: Number, default: 0 }
  }, { timestamps: true });

  export const Vendor = mongoose.model("Vendor",vendorSchema) 
  