const initState = {
    user: null,
    user_token: null
};

const rootReducer = (state = initState, action) => {
    if(action.type === "UPDATE_USER_TOKEN"){
        return {...state, user_token: action.user_token}
    }else if(action.type === "UPDATE_USER"){
        return {...state, user: action.user}
    }
    return state;
};

export default rootReducer;
