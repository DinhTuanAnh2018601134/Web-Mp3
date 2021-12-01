import React from 'react';
import './header.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from "react-router-dom";

Header.propTypes = {

};

function Header(props) {

    const isSignedIn = useSelector(state => state.user.isSignedIn);
    const currentUser = useSelector(state => state.user.currentUser);
    const [searchSong, setSearchSong] = useState("");

    const handleSearchSongChange = (e) => {
        setSearchSong(e.target.value);
    }
    const handleStop = (event) => {
        if (!searchSong) {
            event.preventDefault();
        }
    }
    const pressEnter = (e) => {
        if (e.charCode === 13) {
            document.getElementById('btn-search').click();
        }
    }
    const setPhoto = () => {
        if(isSignedIn)
            return <img className="img-fluid photo-url" src={currentUser.photoURL} alt="" />
        return <i className="fa fa-user mt-2" />
    }

    const ConvertURL = (str) => {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
    
    return (
        <div className="header pt-3 col-10">
            <div className="header-left">
                <input value={searchSong} onKeyPress={pressEnter} onChange={handleSearchSongChange} type="text" className="search-music ml-5" placeholder="Nhập tên bài hát, Nghệ sĩ..." />
            </div>
            <div className="header-right pl-3">
                <ul className="list-manage">
                    <li className="list-manage-item search-item mr-5">
                        <Link id="btn-search" onClick={handleStop} to={`/tim-kiem/${ConvertURL(searchSong)}`}><i className="fa fa-search mt-2" /></Link>
                    </li>
                    <li className="list-manage-item theme-item mr-5">
                        <i className="fa fa-tshirt mt-2" />
                    </li>
                    <li className="list-manage-item setting-item mr-5">
                        <i className="fa fa-cog mt-2" />
                    </li>
                    <Link to={(isSignedIn) ? "/tai-khoan" : "/dang-nhap"}>
                        <li className="list-manage-item account-item">
                            {setPhoto()}
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Header;