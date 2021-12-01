import React from 'react';
import './zingchart.css'
import ItemZingchart from './ItemZingchart';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPlaylist, setActiveSong } from '../../actions/playlist';

Zingchart.propTypes = {

};

function Zingchart(props) {

    const [listZingchart, setListZingchart] = useState([]);
    const dispatch = useDispatch();

    //get list zing chart
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
                        position: song.position,
                        rankStatus: song.rank_status,
                        rankNum: song.rank_num
                    }
                    newList.push(newSong);
                })
                setListZingchart(newList);
            })
        return () => {

        }
    }, [])

    //set playlist, day len store, luu vao local storage
    const setPlaylist = () => {
        const actionAddNewPlaylist = addNewPlaylist(listZingchart);
        localStorage.setItem('playlistMp3', JSON.stringify(listZingchart));

        //set bai hat duoc phat, day len store, luu vao local storage
        let activeId = Math.floor(Math.random(1) * 100);
        const actionSetActiveSong = setActiveSong(listZingchart[activeId]);
        localStorage.setItem('activeSongtMp3', JSON.stringify(listZingchart[activeId]));

        dispatch(actionAddNewPlaylist);
        dispatch(actionSetActiveSong);
    }

    return (
        <div className="container page-zingchart">
            <h1 className="page-title">#zingchart <i onClick={setPlaylist} className="fa fa-play-circle"></i></h1>
            <div className="row mt-5">
                <div className="list-song col-12">
                    <table className="table table-hover">
                        <tbody>
                            {listZingchart.map(song => {
                                return <ItemZingchart
                                    key={song.encodeId}
                                    encodeId={song.encodeId}
                                    thumbnailM={song.thumbnailM}
                                    title={song.title}
                                    artistsNames={song.artistsNames}
                                    position={song.position}
                                    rankStatus={song.rankStatus}
                                />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Zingchart;