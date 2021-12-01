import React from 'react';
// import { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './user.css';
import '../../style/detail.css';
import DetailMusicItem from '../detailMusicItem/DetailMusicItem';

function User(props) {

    const currentUser = useSelector(state => state.user.currentUser);
    const [listMusic, setListMusic] = useState([]);

    useEffect(() => {
        fetch('https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1')
            .then(res => res.json())
            .then(res => {
                const newList = [];
                res.data.song.forEach(song => {
                    const newSong = {
                        encodeId: song.id,
                        thumbnailM: song.thumbnail,
                        title: song.title,
                        artistsNames: song.artists_names,
                    }
                    newList.push(newSong);
                })
                setListMusic(newList);
            })
        return () => {

        }
    }, [])

    return (
        <div className="user">
            <div className="sign-out float-right">
                <span className="float-right btn-group">
                    <i className="fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu dropdown-menu-right">
                        <a href="/discover"><i className="fa fa-arrow-down dropdown-item btn-sign-out" onClick={() => firebase.auth().signOut()}> Đăng xuất</i></a>
                    </div>
                </span>
            </div>
            <div className="user-info">
                <img src={currentUser.photoURL} alt="" className="user-photo" />
                <p className="user-name">{currentUser.displayName}</p>
            </div>
            <div className="user-musics container">
                <div className="row">
                    <div className="slide-thumbnail col-4">
                        <img src={currentUser.photoURL} className="user-photo" alt="" />
                    </div>
                    <div className="user-playlist col-8" id="style-1">
                        <table className="table table-hover">
                            <tbody>
                                {
                                    listMusic.map((song, key) => {
                                        return (
                                            <DetailMusicItem
                                                key={song.encodeId}
                                                encodeId={song.encodeId}
                                                thumbnailM={song.thumbnailM}
                                                title={song.title}
                                                artistsNames={song.artistsNames}
                                            />)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;