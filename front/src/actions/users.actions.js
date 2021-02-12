
export const updateUserToken = (token) => {
    return {
        type: "UPDATE_USER_TOKEN",
        token: token
    }
};

export const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user: user
    }
};
