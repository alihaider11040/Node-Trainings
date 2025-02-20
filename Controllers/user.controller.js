import userService from '../services/user-service'


import {IUser} from '../interfaces/user'


class userController{
    async signUp(req , res , next){
        const {email , name , password , role} = req.body
        const userInterface = {
            email,
            name,
            password,
            role

        }

        const newUser = await userService.signUp(userInterface)
        if(newUser) {
            res.sta
        }

    }

}