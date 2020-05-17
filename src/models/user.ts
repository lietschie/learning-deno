import db from "../../db.ts";
const database = db.getDatabase;
const users = database.collection("users");
export interface User{ 
    _id : {
      $oid: string
    },
    username: string,
    password: string
}

export const getUserByUsername = async (username : string | undefined) => {
    if(username == undefined) return false
    let findUser : User = await users.findOne({username:username})
    let user = {
        id : findUser._id.$oid,
        username : findUser.username
    }
    return findUser
}