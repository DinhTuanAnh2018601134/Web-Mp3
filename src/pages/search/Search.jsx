import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchItem from './SearchItem';
import "./search.css";

Search.propTypes = {
    
};

function Search(props) {

    const {slug} = useParams();
    const [listSearchSong, setListSearchSong] = useState([]);

    useEffect(() => {
        // get list search song
        fetch(`http://ac.mp3.zing.vn/complete?type=artist,song,key,code&num=500&query=${slug}`)
        .then((res) => {
            return res.json();
        })
        .then((listSong) => {
            setListSearchSong(listSong.data[0].song);
        })
        .catch(err => {
            console.log(err);
        })
    },[slug])

    return (
        <div className="search-page">
            <h1 className="page-title">Kết Quả Tìm Kiếm <i className="fa fa-play-circle"></i></h1>
            <div className="row mt-5">
                <div className="list-search-song col-12">
                    <table className="table table-hover">
                        <tbody>
                            {
                                listSearchSong.map(song => {
                                    return <SearchItem 
                                        key={song.id}
                                        encodeId={song.id}
                                        thumbnailM={`https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/${song.thumb}`}
                                        title={song.name}
                                        artistsNames={song.artist}
                                    />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Search;