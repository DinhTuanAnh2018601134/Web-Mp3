import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong } from '../../actions/playlist';
import {setCurrentSong} from '../../features/index.js';
import {addSongToPlaylist} from '../../features/index.js';

DetailMusicItem.propTypes = {
    title: PropTypes.string,
    thumbnailM: PropTypes.string,
    artistsNames: PropTypes.string
};
DetailMusicItem.defaultProp = {
    title: '',
    encodeId: '',
    thumbnailM: '',
    artistsNames: ''
};

function DetailMusicItem(props) {
    
    const dispatch = useDispatch();
    const playlist = useSelector(state => state.playlist.list);
    const isSignedIn = useSelector(state => state.user.isSignedIn);

    const downloadSong = () => {
        if(!isSignedIn)
            alert("Đăng nhập để tải nhạc");
        else
        alert("Không tải được đâu nghe online đê");
    }

    return (
        <tr>
            <td onClick={() => setCurrentSong(props, playlist, setActiveSong, dispatch)} className="row">
                <div className="song-thumbnail col-2">
                    <i className="fa fa-music mt-3 mr-1" />
                    <img className="mt-1" src={props.thumbnailM} alt="" />
                </div>
                <div className="song-info col-8 ml-1 mb-2">
                    <span className="song-title">{props.title}</span>
                    <br />
                    <span className="song-artist">{props.artistsNames}</span>
                </div>
            </td>
            <td onClick={() => setCurrentSong(props, playlist, setActiveSong, dispatch)} className="text-center"><span>4:00</span></td>
            <td className="setting">
                <span className="float-right btn-group">
                    <i className="fa fa-ellipsis-h" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                    <div className="dropdown-menu dropdown-menu-right">
                        <i className="fa fa-arrow-down dropdown-item" onClick={downloadSong}> Tải xuống</i>
                        <i onClick={() => addSongToPlaylist(props, playlist, dispatch)} className="fa fa-plus dropdown-item"> Thêm vào playlist</i>
                    </div>
                </span>
            </td>
        </tr>
    );
}

export default DetailMusicItem;