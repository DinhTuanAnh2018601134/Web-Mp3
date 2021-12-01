import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong } from '../../actions/playlist';
import { addSongToPlaylist, setCurrentSong } from '../../features/index.js';

ItemZingchart.propTypes = {
    title: PropTypes.string,
    encodeId: PropTypes.string,
    thumbnailM: PropTypes.string,
    artistsNames: PropTypes.string,
    position: PropTypes.number,
    rankStatus: PropTypes.string,
    rankNum: PropTypes.string
};

function ItemZingchart(props) {

    const isSignedIn = useSelector(state => state.user.isSignedIn);
    const dispatch = useDispatch();
    const playlist = useSelector(state => state.playlist.list);
    const setDisplayRankStatus = () => {
        if(props.rankStatus === "stand")    
            return <span className="sort stand">-</span>
        else if(props.rankStatus === "up")
            return (
                <div className="sort up">
                    <i className="fa fa-sort-up"></i>
                </div>
            )
        else 
            return <span className="sort down"><i className="fa fa-sort-down"></i></span>
    }
    const downloadSong = () => {
        if(!isSignedIn)
            alert("Đăng nhập để tải nhạc");
        else
        alert("Không tải được đâu nghe online đê");
    }

    return (
        <tr className="row">
            <td onClick={() => setCurrentSong(props, playlist, setActiveSong, dispatch)} className="col-6 row song-item-zingchart">
                <div className="song-thumbnail col-4">
                    <span className="song-number one">{props.position}</span>
                    {setDisplayRankStatus()}
                    <img className="mt-1" src={props.thumbnailM} alt="" />
                </div>
                <div className="song-info col-8 mb-2">
                    <span className="song-title">{props.title}</span>
                    <br />
                    <span className="song-artist">{props.artistsNames}</span>
                </div>
            </td>
            <td onClick={() => setCurrentSong(props, playlist, setActiveSong, dispatch)} className="text-center col-3 mx-auto">
                <span className="">4:00</span>
            </td>
            <td className="setting col-3">
                <span className="float-right btn-group drop-left">
                    <i className="fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="zing-chart-more dropdown-menu">
                        <i className="fa fa-arrow-down dropdown-item" onClick={downloadSong}> Tải xuống</i>
                        <i onClick={() => addSongToPlaylist(props, playlist, dispatch)} className="fa fa-plus dropdown-item"> Thêm vào playlist</i>
                    </div>
                </span>
            </td>
        </tr>
    );
}

export default ItemZingchart;