import React from 'react';
import './navbar.css';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import {useLocation} from 'react-router';

Navbar.propTypes = {
    
};

function Navbar(props) {

    const isSignedIn = useSelector(state => state.user.isSignedIn);
    const [pathnameActive, setPathnameActive] = useState("");

    const pathName = useLocation().pathname;
    
    const ConvertURL = (str) => {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();
        // Xóa ký tự đặc biệt
        str = str.replace(/([/])/g, '');
        // return
        return str;
    }
    const handleClickNav = (e) => {
        const listNav = document.querySelectorAll('.nav-item');
        listNav.forEach(nav => {
            nav.classList.remove('active');
        })
        e.target.parentElement.classList.add('active');
    }
    const setActiveNav = () => {
        setPathnameActive(pathName);
        const listNav = document.querySelectorAll('.nav-item');
        listNav.forEach(nav => {
            nav.classList.remove('active');
        })
        if(pathName === "/tai-khoan" || pathName === "/discover" || pathName === "/zing-chart" ||
        pathName === "/moi-phat-hanh" || pathName === "/tai-khoan" || pathName === "/tai-khoan")
            document.querySelector(`.nav-${ConvertURL(pathName)}`).classList.add('active');
    }

    useEffect(() => {
        setActiveNav();
    }, [pathName])

    return (
        <div className="col-2 nav-left col-left">
            <div className="nav-brand mt-3">
                <img className="img-fluid" src="https://static-zmp3.zadn.vn/zmp3_rpt/images/logo-mp3.svg" alt="" />
            </div>
            <div className="zm-nav nav-top">
                <nav className="navbar navbar-expand-lg">
                    <ul style={{display: 'block'}} className="navbar-nav mr-auto">
                        <li className="nav-item nav-tai-khoan">
                            <Link className="nav-link" to={(isSignedIn) ? "/tai-khoan" : "/dang-nhap"}><i className="fa fa-music" /> Cá Nhân</Link>
                        </li>
                        <li className="nav-item nav-discover">
                            <Link className="nav-link" to="/discover"><i className="fa fa-compact-disc" /> Khám Phá</Link>
                        </li>
                        <li className="nav-item nav-zing-chart">
                            <Link className="nav-link" to="/zing-chart"><i className="fa fa-chart-line" /> #zingchart</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <hr />
            <div className="zm-nav nav-bot">
                <nav className="navbar navbar-expand-lg">
                    <ul style={{display: 'block'}} className="navbar-nav mr-auto">
                        <li className="nav-item nav-moi-phat-hanh">
                            <Link className="nav-link" to="/moi-phat-hanh"><i className="fa fa-headphones-alt" /> Nhạc mới</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/"><i className="fa fa-icons" /> Thể Loại</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/"><i className="fa fa-star" /> Top 100</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;