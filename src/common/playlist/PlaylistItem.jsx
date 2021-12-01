import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setActiveSong } from '../../actions/playlist';

PlaylistItem.propTypes = {
    title: PropTypes.string,
    encodeId: PropTypes.string,
    thumbnailM: PropTypes.string,
    artistsNames: PropTypes.string
};
PlaylistItem.defaultProp = {
    title: '',
    encodeId: '',
    thumbnailM: '',
    artistsNames: ''
};

function PlaylistItem(props) {

    const dispatch = useDispatch();

    //set bai hat duoc phat, day len store, luu vao local storage
    const setCurrentSong = () => {
        let currentSong = {
            title: props.title,
            encodeId: props.encodeId,
            thumbnailM: props.thumbnailM,
            artistsNames: props.artistsNames
        }

        const actionSetActiveSong = setActiveSong(currentSong);
        localStorage.setItem('activeSongtMp3', JSON.stringify(currentSong));
        dispatch(actionSetActiveSong);
    }

    return (
        <tr>
            <td className="row playlist-item">
                <div onClick={setCurrentSong} className="song-thumbnail col-3">
                    <i className="fa fa-music mt-3 mr-1" />
                    <img className="mt-1" src={props.thumbnailM} alt="" />
                </div>
                <div onClick={setCurrentSong} className="song-info col-7 ml-1 mb-2">
                    <span className="song-title">{props.title}</span>
                    <br />
                    <span className="song-artist">{props.artistsNames}</span>
                </div>
                <div className="col-1 setting mr-1 ml-1">
                    <i className="fa fa-ellipsis-h text-left" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu dropdown-menu-right row">
                        <i onClick={() => props.handleRemoveSong(props.encodeId)} className="fa fa-trash dropdown-item"> Xóa</i>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default PlaylistItem;