import React from 'react'
import LeftSideBar from './LeftSideBar'
import RightSearchPane from './RightSearchPane'
import { useState, useEffect, useCallback } from 'react'
import Table from './Table';


export default function Home() {
    const [toggle, setToggle] = useState(false);
    const [search, setSearch] = useState({});
    const [error, setError] = useState({});
    const [final, setFinal] = useState([]);
    const handSetFinal = (param) => {
        setFinal(param)
    }
    const handleClick = () => {
        setToggle(!toggle);
    };
    const clear = () => {
        setFinal([]);
    }
    const handleSearch = () => {
        if(!error.item){
            fetch("https://theorphanagehub.org/admin/api")
            .then(res => res.json())
            .then(res => {
                setFinal(res);
            })
        }
    }

    const handleChange = useCallback((e) => {
        setSearch((search) => {
            setError((error) => {
                return {...error, [e.target.name]: validation(e)}
            })
            return {...search, [e.target.name]: e.target.value}
        });
    },
    [search]);

    const validation = (e) => {
        if (isNaN(e.target.value)){
            return true
        }
        else{
            return false;
        }
    }
    // console.log(search)
    return (
        <div className="body">
            <LeftSideBar />
            <RightSearchPane clear={clear} handSetFinal={handSetFinal} handleClick={handleClick} toggle={toggle}/>
            <div id="main">
                <div className="top1">
                    <div className="content">
                        HOME <span className="gt">&#62;</span> OC <span className="gt">&#62;</span> <span  className="it">Item Search</span>
                    </div>
                </div>
                <div className="top2">
                    <div className="content">
                        <h3>Item search</h3>
                        <p>{final.length} items</p>
                    </div>
                    <div className="content-right">
                        <div className="content-right-inner">
                            <div style={{
                                border: (error.item) ? '1px solid red' : '1px solid #3D92EC'
                            }} className="search-bar">
                                <input name="item" onChange={handleChange} type="text"/><i onClick={handleSearch} className="fa fa-search"></i>
                            </div>
                            <div className="plus-icon">&#43;</div>
                            <div onClick={handleClick} className="menu-icon">&#9776;</div>
                        </div>
                        <p className="error">{
                            error.item? "Enter a number" : ""
                        }</p>
                        
                    </div>
                </div>

                {
                    final.length <= 0 ?
                        <div className="center-word">
                            <div className="header">
                                <h2>What are you looking for?</h2>
                                <p>Get started by searching and filtering a few</p>
                            </div>
                            <button>Fetch data</button>
                            <p>or <span>search for an item</span></p>
                        </div>
                    :
                    <Table final={final}/>
                }
                
            </div>
        </div>
    )
}
