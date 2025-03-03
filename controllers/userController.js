const userService = require( '../services/user-service').default;

export const signUp = async (request, response, next) => {
    try {
        const { email, name, password, role } = request.body;

        const userInterface = { 
            email,
            name,
            hashed_password:password,
             role };

        const newUser = await userService.signUp(userInterface);

        if (!newUser) {
            return response.status(400).json({ message: "Failed to create user" });
        }

        response.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
};

export const login = async (request, res , next )=>{
    try{
    const {email , password } = request.body
    const loginDTO = {email, password}

    const loginResponse = await userService.login(loginDTO)

    res.status(200).json({loginResponse})
}catch(error){
    next(error)

}
}

export const updateUser = async(request,res, next)=>{

    try{
    const {name , email , password , role} = request.body
    const userObject = {
        name,
        email,
        role
    }
    const serviceResponse = await userService.updateUser(userObject)
    res.status(201).json({serviceResponse})
}catch(error){
    next(error)
}




}

    
