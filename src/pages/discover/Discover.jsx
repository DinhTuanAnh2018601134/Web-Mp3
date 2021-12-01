import React from 'react';
import './discover.css';
import MusicItem from '../musicItem/MusicItem';
import { useEffect, useState } from 'react';

const apiVpopRising = "https://mp3-music-sever.herokuapp.com/api/listMusic";

Discover.propTypes = {
    
};

function Discover(props) {
    const [listTopMusic, setListTopMusic] = useState([])
    const [listWantToHearMusic, setListWantToHearMusic] = useState([])
    const [listLikeMusic, setListLikeMusi] = useState([])
    const [listNewMusic, setListNewMusic] = useState([])

    const getlistMusic = () => {
        fetch(apiVpopRising)
            .then((res) => {
                return res.json();
            })
            .then((listMusic) => {
                setListTopMusic(listMusic.listTopMusic);
                setListWantToHearMusic(listMusic.listWantToHearMusic);
                setListLikeMusi(listMusic.listLikeMusic);
                setListNewMusic(listMusic.listNewMusic);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getlistMusic();
    }, [])
    return (
        <div className="content discover-page">
            <div className="recent-music container">
                <h4 className="list-title pb-2">Có Thể Bạn Muốn Nghe <i className="fa fa-chevron-right"></i></h4>
                <div className="list-recent-music mb-3 row">
                    {
                        listWantToHearMusic.map((list) => {
                            return <MusicItem
                                key={list.id}
                                title={list.title}
                                thumbnailM={list.thumbnailM}
                            />
                        })
                    }
                </div>
                <h4 className="list-title pb-2">Càng Nghe Càng Mê <i className="fa fa-chevron-right"></i></h4>
                <div className="list-recent-music mb-3 row">
                    {
                        listLikeMusic.map((list) => {
                            return <MusicItem
                                key={list.id}
                                title={list.title}
                                thumbnailM={list.thumbnailM}
                            />
                        })
                    }
                </div>
                <h4 className="list-title pb-2">Top 100 <i className="fa fa-chevron-right"></i></h4>
                <div className="list-recent-music mb-3 row">
                    {
                        listTopMusic.map((list) => {
                            return <MusicItem
                                key={list.id}
                                title={list.title}
                                thumbnailM={list.thumbnailM}
                            />
                        })
                    }
                </div>
                <h4 className="list-title pb-2">Nhạc Mới Mỗi Ngày <i className="fa fa-chevron-right"></i></h4>
                <div className="list-recent-music mb-3 row">
                    {
                        listNewMusic.map((list) => {
                            return <MusicItem
                                key={list.id}
                                title={list.title}
                                thumbnailM={list.thumbnailM}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Discover;