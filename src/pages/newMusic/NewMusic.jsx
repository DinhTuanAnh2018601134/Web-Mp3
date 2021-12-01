import React from 'react';
import './newMusic.css';
import ItemNewMusic from './ItemNewMusic';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPlaylist, setActiveSong } from '../../actions/playlist';


NewMusic.propTypes = {
    
};

function NewMusic(props) {

    const [listNewMusic, setListNewMusic] = useState([]);
    const dispatch = useDispatch();

    //get list zing chart
    useEffect(() => {
        fetch('https://mp3-music-sever.herokuapp.com/api/listNewVpopMusic')
            .then(res => res.json())
            .then(res => {
                setListNewMusic(res.songs);
            })
        return () => {

        }
    }, [])

    //set playlist, day len store, luu vao local storage
    const setPlaylist = () => {
        const actionAddNewPlaylist = addNewPlaylist(listNewMusic);
        localStorage.setItem('playlistMp3', JSON.stringify(listNewMusic));

        //set bai hat duoc phat, day len store, luu vao local storage
        let activeId = Math.floor(Math.random(1) * listNewMusic.length);
        const actionSetActiveSong = setActiveSong(listNewMusic[activeId]);
        localStorage.setItem('activeSongtMp3', JSON.stringify(listNewMusic[activeId]));

        dispatch(actionAddNewPlaylist);
        dispatch(actionSetActiveSong);
    }

    return (
        <div className="container page-new-music mt-5">
        <h1 className="page-title">Mới Phát Hành <i onClick={setPlaylist} className="fa fa-play-circle"></i></h1>
        <div className="row mt-5">
            <div className="list-song col-12">
                <table className="table table-hover">
                    <tbody>
                        {listNewMusic.map((song, index) => {
                            return <ItemNewMusic
                                key={song.encodeId}
                                encodeId={song.encodeId}
                                thumbnailM={song.thumbnailM}
                                title={song.title}
                                artistsNames={song.artistsNames}
                                position={index + 1}
                            />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default NewMusic;