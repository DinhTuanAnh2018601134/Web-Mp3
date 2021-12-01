import React from 'react';
import "./playlist.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistItem from './PlaylistItem';
import { addNewPlaylist, setActiveSong } from '../../actions/playlist';

Playlist.propTypes = {

};

function Playlist(props) {

    const playlistStatus = useSelector(state => state.playlist.status);//get trang thai cua playlist
    const listSong = useSelector(state => state.playlist.list);//get playlist tu store
    const [list, setList] = useState([]);
    const activeSong = useSelector(state => state.playlist.activeSong);
    const dispatch = useDispatch();

    const showClass = (playlistStatus) ? "col-3 playlist-right show-playlist" : "col-3 playlist-right";

    //set playlist
    useEffect(() => {
        setList(listSong);
    }, [listSong])
    
    //delete bai hat khoi playlist
    const handleRemoveSongFromPlaylist = (removeId) => {
        const newList = list.filter((song) => {
            return song.encodeId !== removeId;
        })
        const removeIndex = list.findIndex((song) => {
            return song.encodeId === removeId;
        })

        if(removeId === activeSong.encodeId){
            if(removeIndex === list.length - 1){
                const actionSetActiveSong = setActiveSong(newList[0]);
                localStorage.setItem('activeSongtMp3',JSON.stringify(newList[0]));
                dispatch(actionSetActiveSong); 
            }
            else{
                const actionSetActiveSong = setActiveSong(newList[removeIndex]);
                localStorage.setItem('activeSongtMp3',JSON.stringify(newList[removeIndex]));
                dispatch(actionSetActiveSong); 
            }
        }

        const removeSongFromPlaylist = addNewPlaylist(newList);
        localStorage.setItem('playlistMp3',JSON.stringify(newList));
        dispatch(removeSongFromPlaylist); 
    }

    return (
        <div className={showClass} id="style-1">
            <table className="table table-hover">
                <thead>
                    <tr className="text-center">
                        <th className="col-6">DANH SÁCH PHÁT</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(song => {
                        return (
                            <PlaylistItem 
                                key={song.encodeId}
                                encodeId={song.encodeId}
                                thumbnailM={song.thumbnailM}
                                title={song.title}
                                artistsNames={song.artistsNames}
                                handleRemoveSong={handleRemoveSongFromPlaylist}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Playlist;