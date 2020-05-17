import { Request, Response, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { makeJwt, setExpiration, Jose, Payload, } from "https://deno.land/x/djwt/create.ts"
import db from "../../db.ts";
import { User } from "../models/user.ts";

const database = db.getDatabase;
const users = database.collection("users");

const key = "emangmantul123"




export const login = async (
  { params, response }: { params: RouteParams; response: Response },
) => {
  
  const payload : Payload = {
    iss: "joshua",
    exp: setExpiration(new Date().getTime() + (60000 * 60))
  }

  const header : Jose = {
    alg : "HS256",
    typ : "JWT"
  }

  response.body = makeJwt({ header, payload, key }) + "\n" ;
};

export const getAllUser = async({ request, response }: { request: Request; response: Response }) => {
  try {
    let getUsers : User[] = await users.find()

    let userList = getUsers.map(user => {
      const { _id : { $oid }, username,password } = user;
      return { id: $oid, username,password };
    }) ?? []
    

    response.body = userList
    response.status = 200
    return


  } catch (error) {
    console.log(error)
    response.body = error
    response.status = 500
  }
}

export const register = async({ request, response }: { request: Request; response: Response }) => {
  try {
    const body =  (await request.body()).value;
    const { username, password }  = body;

    if (!Object.keys(body).length) {
      response.status = 422;
      response.body = JSON.stringify({ errors: "Error" });
    }

    const insertUser = await users.insertOne({
      username,
      password,
    });

    response.body = JSON.stringify({ message: "berhasil" });
  } catch (error) {
    console.log(error);
  } 
}


export const coba_masuk = async({ request, response }: { request: Request; response: Response }) => {
  response.body = "kintil"
  response.status = 200
  return
  // let requestHeaders =  await request.headers.get("Authorization")
  // let getToken = requestHeaders?.split(" ")[1]

  // let tokenTime = new Date().getTime() + (60000 * 60)
  // console.log(new Date())
  // console.log(new Date(tokenTime))

  // const jwt = getToken ?? 'kintil'
  //   if (await validateJwt(jwt, key, { isThrowing: false })){
  //     response.body = "valid jwt"
  //     return
  //   }
  //   response.body = "invalid"
  //   response.status = 401
  //   return
}
// export const coba_masuk = async({ request, response }: { request: Request; response: Response }) => {
//   let requestHeaders =  await request.headers.get("Authorization")
//   let getToken = requestHeaders?.split(" ")[1]

//   let tokenTime = new Date().getTime() + (60000 * 60)
//   console.log(new Date())
//   console.log(new Date(tokenTime))

//   const jwt = getToken ?? 'kintil'
//     if (await validateJwt(jwt, key, { isThrowing: false })){
//       response.body = "valid jwt"
//       return
//     }
//     response.body = "invalid"
//     response.status = 401
//     return
// }
