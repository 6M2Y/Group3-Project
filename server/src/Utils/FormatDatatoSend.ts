import jwt from 'jsonwebtoken'
import { IUser } from '../models/UserSchema';

//gets data from db (server) and formats its
export const FormatDatatoSend = (user:IUser) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string);//jwt token

    return {
          access_token,
          username: user.fullname,
          email: user.email, 
  }
}
