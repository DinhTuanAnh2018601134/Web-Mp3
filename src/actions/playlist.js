export const showPlaylist = (status) => {
    return {
        type: 'SHOW_PLAYLIST',
        playload: status
    }
}
export const addNewPlaylist = (list) => {
    return {
        type: 'ADD_NEW_PLAYLIST',
        playload: list
    }
}
export const addNewSong = (song) => {
    return {
        type: 'ADD_SONG_TO_PLAYLIST',
        playload: song
    }
}
export const setActiveSong = (song) => {
    return {
        type: 'SET_ACTIVE_SONG',
        playload: song
    }
}
export const removeSong = (song) => {
    return {
        type: 'REMOVE_SONG_FROM_PLAYLIST',
        playload: song
    }
}