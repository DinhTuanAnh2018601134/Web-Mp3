export const signedIn = (signedInInfor) => {
    return {
        type: 'LOG_IN',
        playload: signedInInfor
    }
}
export const signedOut = (signedOutInfor) => {
    return {
        type: 'LOG_OUT',
        playload: signedOutInfor
    }
}