
export const updateUserToken = (user_token) => {
    return {
        type: "UPDATE_USER_TOKEN",
        user_token: user_token
    }
};

export const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user: user
    }
};
