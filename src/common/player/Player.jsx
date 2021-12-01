import React from 'react';
import './player.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showPlaylist } from '../../actions/playlist';
import { setActiveSong } from '../../actions/playlist';

Player.propTypes = {

};

function Player(props) {
    const [currentSong, setCurrentSong] = useState({});
    const [listSong, setListSong] = useState([]);
    const [isPlay, setIsPlay] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [songDuration, setSongDuration] = useState(0);

    const activeSong = useSelector(state => state.playlist.activeSong);//get active song tu store
    const playlistStatus = useSelector(state => state.playlist.status);//get trang thai cua playlist
    const playlist = useSelector(state => state.playlist.list);//get trang thai cua playlist
    const dispatch = useDispatch();

    useEffect(() => {
        setListSong(playlist);
    }, [playlist])
    //hien thi bai hat dang duoc phat
    useEffect(() => {
        setCurrentSong(activeSong);
        setCurrentTime(0);

        return () => {

        }
    }, [activeSong])
    useEffect(() => {
        const audio = document.getElementById('audio');
        setSongDuration(audio.duration);
    }, [activeSong])

    //an hien playlist
    const hiddenPlaylist = () => {
        const status = !playlistStatus;

        const action = showPlaylist(status);
        dispatch(action);
    }

    //handle play/pause song
    const audio = document.getElementById('audio');
    const togglePlay = document.querySelector('.btn-toggle-play');
    const handlePlayPauseSong = () => {
        if (!isPlay) {
            audio.play();
            setIsPlay(true);
            togglePlay.classList.add('playing');
        }
        else {
            audio.pause();
            setIsPlay(false);
            togglePlay.classList.remove('playing');
        }
    }
    //khi tien do bai hat thay doi
    const progress = document.getElementById('progress');
    const setProgress = () => {
        if (isPlay) {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress.value = progressPercent;
            setCurrentTime(Math.floor(audio.currentTime));
        }
        if (isPlay && currentTime === 0) {
            // togglePlay.classList.add('playing');
            audio.play()
            progress.value = 0;
        }
        if (!isPlay && currentTime === 0) {
            togglePlay.classList.remove('playing');
            progress.value = 0;
        }
    }
    //format mm:ss
    const secondToMmss = (second) => {
        second = Math.floor(second);
        let mm = Math.floor(second / 60);
        let ss = second - 60 * mm;

        let mDisplay = (mm > 0) ? ((mm >= 10) ? `${mm}:` : `0${mm}:`) : "00:";
        let sDisplay = (ss > 0) ? ((ss >= 10) ? `${ss}` : `0${ss}`) : "00";

        return mDisplay + sDisplay;

    }
    //khi tua bai hat
    const handleChangeDuration = (e) => {
        const seekTime = audio.duration * e.target.value / 100;
        audio.currentTime = seekTime;
    }
    //khi kich nut repeat 
    const clickRepeatSong = (e) => {
        if (isRepeat) {
            setIsRepeat(prevState => !prevState);
            e.target.classList.remove('btn-active');
        }
        else {
            setIsRepeat(prevState => !prevState);
            e.target.classList.add('btn-active');
        }
    }
    //khi kich nut random  
    const clickRandomSong = (e) => {
        if (isRandom) {
            setIsRandom(prevState => !prevState);
            e.target.classList.remove('btn-active');
        }
        else {
            setIsRandom(prevState => !prevState);
            e.target.classList.add('btn-active');
        }
    }
    //khi next bai hat
    const handleNextSong = () => {
        let activeId = null;
        let listLength = listSong.length;
        listSong.forEach((song, index) => {
            if (currentSong.encodeId === song.encodeId) {
                if (index === listLength - 1)
                    activeId = 0;
                else
                    activeId = index + 1;
            }
        })
        const actionSetActiveSong = setActiveSong(listSong[activeId]);
        localStorage.setItem('activeSongtMp3', JSON.stringify(listSong[activeId]));
        dispatch(actionSetActiveSong);
    }
    //khi prev bai hat
    const handlePrevSong = () => {
        let activeId = null;
        let listLength = listSong.length;
        listSong.forEach((song, index) => {
            if (currentSong.encodeId === song.encodeId) {
                if (currentSong.encodeId === song.encodeId) {
                    if (index === 0)
                        activeId = listLength - 1;
                    else
                        activeId = index - 1;
                }
            }
        })
        const actionSetActiveSong = setActiveSong(listSong[activeId]);
        localStorage.setItem('activeSongtMp3', JSON.stringify(listSong[activeId]));
        dispatch(actionSetActiveSong);
    }
    //khi random bai hat
    const handleRandomSong = () => {
        let activeId = null;
        let currentId = null;
        let listLength = listSong.length;
        listSong.forEach((song, index) => {
            if (currentSong.encodeId === song.encodeId) {
                currentId = index;
            }
        })
        do {
            activeId = Math.floor(Math.random() * listLength);
        } while (activeId === currentId);
        const actionSetActiveSong = setActiveSong(listSong[activeId]);
        localStorage.setItem('activeSongtMp3', JSON.stringify(listSong[activeId]));
        dispatch(actionSetActiveSong);
    }
    //khi kich nut next song
    const clickNextSong = () => {
        if (!isRandom) {
            handleNextSong();
        }
        else {
            handleRandomSong();
        }
    }
    //khi kich nut prev song
    const clickPrevSong = () => {
        if (!isRandom) {
            handlePrevSong();
        }
        else {
            handleRandomSong();
        }
    }
    //khi ket thuc bai hat
    const handleEndSong = () => {
        if (isRepeat) {
            audio.play();
        }
        else {
            if (!isRandom) {
                handleNextSong();
            }
            else {
                handleRandomSong();
            }
        }
    }
    //khi muted
    const handleMuted = (e) => {
        var target = e.target;
        var parent = target.parentElement;
        if (!isMuted) {
            audio.muted = true;
            setIsMuted(true);
            parent.classList.add('muted');
        }
        else {
            audio.muted = false;
            setIsMuted(false);
            parent.classList.remove('muted');
        }
    }

    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="col-3 dashboard-left">
                    <div className="cd-thumbnail">
                        <div className="row">
                            <div className="col-4">
                                <img className="mt-1 ml-3" src={currentSong.thumbnailM} alt="" />
                            </div>
                            <div className="col-8 info-song pt-3 pl-2">
                                <span className="title">{currentSong.title}</span>
                                <br />
                                <span className="artist-name">{currentSong.artistsNames}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 player">
                    <div className="control">
                        <div onClick={clickRepeatSong} className="btn btn-repeat">
                            <i className="fas fa-redo" />
                        </div>
                        <div onClick={clickPrevSong} className="btn btn-prev">
                            <i className="fas fa-step-backward" />
                        </div>
                        <div onClick={handlePlayPauseSong} className="btn btn-toggle-play">
                            <i className="fas fa-pause icon-pause" />
                            <i className="fas fa-play icon-play" />
                        </div>
                        <div onClick={clickNextSong} className="btn btn-next">
                            <i className="fas fa-step-forward" />
                        </div>
                        <div onClick={clickRandomSong} className="btn btn-random">
                            <i className="fas fa-random" />
                        </div>
                    </div>
                    <div className="audio-duration">
                        <span className="current-time pr-2">{secondToMmss(currentTime)}</span>
                        <input onChange={handleChangeDuration} id="progress" className="progress" type="range" defaultValue={0} step={1} min={0} max={100} />
                        <span className="audio-time pl-2">{secondToMmss(songDuration)}</span>
                    </div>
                    <audio onEnded={handleEndSong} onTimeUpdate={setProgress} id="audio" src={`http://api.mp3.zing.vn/api/streaming/audio/${currentSong.encodeId}/320`} />
                </div>
                <div className="col-3 player-setting">
                    <div className="volume-setting">
                        <div onClick={handleMuted} className="btn btn-volume">
                            <i className="fa fa-volume-up" />
                            <i className="fa fa-volume-mute" />
                        </div>
                        <input id="progress" className="progress-volume" type="range" defaultValue={100} step={1} min={0} max={100} />
                    </div>
                    <div onClick={hiddenPlaylist} className="hidden-playlist mt-2">
                        <i className="fa fa-music pl-1"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;