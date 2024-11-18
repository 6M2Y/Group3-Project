import User from "../models/UserSchema";


export const generateUserName = async(email:string) => {
    // Generate the initial username based on the email prefix
    let username = email.split("@")[0];
    
    // Check if the username is available
    let userExists = await User.exists({ username });

    // If the username is taken, generate a unique one by appending a random number
    while (userExists) {
        username = email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);
        userExists = await User.exists({ username });
    }
    return username;
}
