const initState = {
    user: null,
    token: null,
};

const rootReducer = (state = initState, action) => {
    if(action.type === "UPDATE_USER_TOKEN"){
        return {...state, token: action.token}
    }else if(action.type === "UPDATE_USER"){
        return {...state, user: action.user}
    }
    return state;
};

export default rootReducer;
