
const playlistInitialState = {
    status: false,
    list: JSON.parse(localStorage.getItem('playlistMp3')) || [],
    // activeSong: JSON.parse(localStorage.getItem('activeSongtMp3')) || null
    activeSong:  {
        "encodeId": "ZU6IEI66",
        "key": "",
        "title": "Yêu Là Cưới",
        "artistsNames": "Phát Hồ, X2X",
        "thumbnailM": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/4/9/d/a/49da6a1d6cf13a42e77bc3a945d9dd6b.jpg",
        "path": ""
    }
};

const playlistReducer = (state = playlistInitialState, action) => {
    switch (action.type) {
        case "SHOW_PLAYLIST":
            return {
                ...state,
                status: action.playload
            }
        case "ADD_NEW_PLAYLIST":
            return {
                ...state,
                list: action.playload
            }
        case "SET_ACTIVE_SONG":
            return {
                ...state,
                activeSong: action.playload
            }
        default:
            return state
    }
}

export default playlistReducer;