import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//middleware before we save we want to run a function
userSchema.pre('save', async function(next){
  //look at current user we are creating and check password 
  //and isn't changed , just move on 
  if(!this.isModified('password')){
    next();
  }
  //if password is modified or just now creating it i.e. new,
  //add salt to the new password 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

//add methods directly to user 
userSchema.methods.matchPassword = async function (enteredPassword){
  //compares the 2 and returns true or false 
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;
