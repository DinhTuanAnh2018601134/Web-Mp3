import { addNewPlaylist, setActiveSong } from '../actions/playlist';
import 'firebase/compat/auth';

//set playlist, day len store, luu vao local storage
export const setPlaylist = (listSong, dispatch) => {
    const actionAddNewPlaylist = addNewPlaylist(listSong);
    localStorage.setItem('playlistMp3',JSON.stringify(listSong));

    //set bai hat duoc phat, day len store, luu vao local storage
    let activeId = Math.floor(Math.random(1) * listSong.length);
    const actionSetActiveSong = setActiveSong(listSong[activeId]);
    localStorage.setItem('activeSongtMp3',JSON.stringify(listSong[activeId]));

    dispatch(actionAddNewPlaylist);
    dispatch(actionSetActiveSong);
}

export const setApi = (url) => {
    switch (url) {
        case "/pop-ballad-viet-noi-bat":
            return "https://mp3-music-sever.herokuapp.com/api/listPopBalladMusic"
        case "/chill-cung-rap-viet":
            return "https://mp3-music-sever.herokuapp.com/api/listChillWithRapVietMusic"
        case "/v-pop-hits-quoc-dan":
            return "https://mp3-music-sever.herokuapp.com/api/listHitVpopMusic"
        case "/guitar-v-pop":
            return "https://mp3-music-sever.herokuapp.com/api/listGuitarVpopMusic"
        case "/rap-viet-ngay-nay":
            return "https://mp3-music-sever.herokuapp.com/api/listCurentRapMusic"
        case "/combo-hits":
            return "https://mp3-music-sever.herokuapp.com/api/listComboHitsMusic"
        case "/bedroom-pop":
            return "https://mp3-music-sever.herokuapp.com/api/listBedroomPopMusic"
        case "/edm-now":
            return "https://mp3-music-sever.herokuapp.com/api/listEdmNowMusic"
        case "/top-100-nhac-v-pop-hay-nhat":
            return "https://mp3-music-sever.herokuapp.com/api/listTopVpopMusic"
        case "/top-100-bai-hat-nhac-tre-hay-nhat":
            return "https://mp3-music-sever.herokuapp.com/api/listTopYoungMusic"
        case "/top-100-pop-au-my-hay-nhat":
            return "https://mp3-music-sever.herokuapp.com/api/listTopUsUkMusic"
        case "/top-100-nhac-electronicdance-au-my-hay-nhat":
            return "https://mp3-music-sever.herokuapp.com/api/listTopEdmMusic"
        case "/top-100-nhac-han-quoc-hay-nhat":
            return "https://mp3-music-sever.herokuapp.com/api/listTopKpopMusic"
        case "/v-pop-thang-112021":
            return "https://mp3-music-sever.herokuapp.com/api/listNewVpopMusic"
        case "/us-uk-thang-112021":
            return "https://mp3-music-sever.herokuapp.com/api/listNewUsUkMusic"
        case "/k-pop-thang-112021":
            return "https://mp3-music-sever.herokuapp.com/api/listNewKpopMusic"
        case "/indie-viet-thang-112021":
            return "https://mp3-music-sever.herokuapp.com/api/listNewVindieMusic"
        default:
            return "";
    }
}

//set bai hat duoc phat, day len store, luu vao local storage
export const setCurrentSong = (props, playlist, setActiveSong, dispatch) => {
    let currentSong = {
        title: props.title,
        encodeId: props.encodeId,
        thumbnailM: props.thumbnailM,
        artistsNames: props.artistsNames
    }
    
    //add bai hat vao playlist
    if(!playlist.some(song => song.encodeId === currentSong.encodeId)){
        playlist.unshift(currentSong);
        const actionAddNewPlaylist = addNewPlaylist(playlist);
        localStorage.setItem('playlistMp3',JSON.stringify(playlist));
        dispatch(actionAddNewPlaylist);
    }

    const actionSetActiveSong = setActiveSong(currentSong);
    localStorage.setItem('activeSongtMp3',JSON.stringify(currentSong));
    dispatch(actionSetActiveSong);
}

//add bai hat vao playlist
export const addSongToPlaylist = (props, playlist, dispatch) => {
    if(!playlist.some(song => song.encodeId === props.encodeId)){
        playlist.push(props);
        const actionAddNewPlaylist = addNewPlaylist(playlist);
        localStorage.setItem('playlistMp3',JSON.stringify(playlist));
        dispatch(actionAddNewPlaylist);
    }
}
