import React from 'react';
import '../../style/detail.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DetailMusicItem from '../detailMusicItem/DetailMusicItem';
import { setApi, setPlaylist } from '../../features';

DetailListMusic.propTypes = {

};

function DetailListMusic(props) {
    const url =  window.location.pathname;
    const api = setApi(url);

    const [listMusic, setListMusic] = useState({});
    const [listSong, setListSong] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        // get list music va list song
        fetch(api)
            .then((res) => {
                return res.json();
            })
            .then((listMusic) => {
                setListMusic(listMusic);
                setListSong(listMusic.songs);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="info-list-music col-4 pr-5">
                    <div className="thumbnail-top">
                        <img src={listMusic.thumbnailM} alt="" />
                    </div>
                    <div className="title">
                        <p>{listMusic.title}</p>
                    </div>
                    <div onClick={() => setPlaylist(listSong, dispatch)} className="btn btn-play">
                        <div className="btn btn-danger"><i className="fa fa-play" /> PHÁT NGẪU NHIÊN</div>
                    </div>
                </div>
                <div className="col-4" style={{zIndex:-1}}></div>
                <div className="detail-list-music col-8 float-right">
                    <div className="list-description">
                        <p>{listMusic.sortDescription}</p>
                    </div>
                    <div className="list-song">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="col-6">BÀI HÁT</th>
                                    <th className="col-3 text-center">THỜI GIAN</th>
                                    <th className="col-3">
                                        <div className="btn-group float-right">
                                            <button type="button" className="btn btn-sm btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                MẶC ĐỊNH
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="/">Mặc định</a>
                                                <a className="dropdown-item" href="/">Tên bài hát(A-Z)</a>
                                                <a className="dropdown-item" href="/">Tên ca sĩ(A-Z)</a>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSong.map((song) => {
                                    return (
                                        <DetailMusicItem
                                            key={song.encodeId}
                                            encodeId={song.encodeId}
                                            thumbnailM={song.thumbnailM}
                                            title={song.title}
                                            artistsNames={song.artistsNames}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailListMusic;