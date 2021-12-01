const userInitialState = {
    isSignedIn: false,
    currentUser: {}
}

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                isSignedIn: true,
                currentUser: action.playload
            }
        case "LOG_OUT":
            return action.playload

        default:
            return state
    }
}

export default userReducer;
