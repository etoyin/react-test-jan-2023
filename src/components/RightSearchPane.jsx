import React from 'react'
import { useState, useEffect, useCallback } from 'react'
// import { useState } from 'react'


export default function RightSearchPane(props) {
    const [search, setSearch] = useState({});
    // const [search2, setSearch2] = useState({});
    const [error, setError] = useState({});
    const [type, setType] = useState([]);
    // const [final, setFinal] = useState([]);
    // const [error2, setError2] = useState(false);
    
    
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
            return true;
        }
        else{
            return false;
        }
    }

    const handleCheckbox = (e) => {
		let type1 = type;
		let index;
		if(e.target.checked){
            let val = e.target.value;
			type1.push(val);
		}
		else{
            let val = e.target.value;
			index = type1.indexOf(val);
            type1.splice(index, 1);
		}
		setType(type1);
	}

    const handleSubmit = () => {
        if (!error.order && !error.item){
            let items = search.item ? search.item.split(",") : [];
            let orders = search.order ? search.order.split(","): [];
            let filtered1,filtered2,filtered3 = [];
            let result;
            fetch("https://theorphanagehub.org/admin/api")
            .then(res => res.json())
            .then(res => {
                let final;
                result = res;
                // let recurFunc = (i) => {
                //     if (element.length > i+1){
                //         recurFunc (i+1) ;
                //     }
                //     return 
                // }
                if (items.length && orders.length == 0 && type.length == 0){
                    filtered1 = []
                    for (let i = 0; i < items.length; i++){
                        filtered1 = filtered1.concat(result.filter((item) => {
                            return item.item == items[i];
                        }))
                    }
                    console.log(filtered1)
                    final = filtered1
                }else if (items.length == 0 && orders.length && type.length == 0){
                    filtered3 = []
                    for (let i = 0; i < orders.length; i++){
                        filtered3 = filtered3.concat(result.filter((item) => {
                            return item.order == orders[i];
                        }))
                    }
                    console.log(filtered3)
                    final = filtered3
                }else if (items.length == 0 && orders.length == 0 && type.length){
                    filtered3 = []
                    for (let i = 0; i < type.length; i++){
                        filtered3 = filtered3.concat(result.filter((item) => {
                            return item.type == type[i];
                        }))
                    }
                    console.log(filtered3)
                    final = filtered3
                }else if(items.length && orders.length && type.length == 0){
                    filtered1 = []; filtered2 = []
                    for (let i = 0; i < items.length; i++){
                        filtered1 = filtered1.concat(result.filter((item) => {
                            return item.item == items[i];
                        }))
                    }
                    for (let i = 0; i < orders.length; i++){
                        filtered2 = filtered2.concat(filtered1.filter((item) => {
                            return item.order == orders[i];
                        }))
                    }
                    console.log(filtered2)
                    final = filtered2
                }else if(items.length && orders.length == 0 && type.length){
                    filtered1 = []; filtered2 = []
                    for (let i = 0; i < items.length; i++){
                        filtered1 = filtered1.concat(result.filter((item) => {
                            return item.item == items[i];
                        }))
                    }
                    for (let i = 0; i < type.length; i++){
                        filtered2 = filtered2.concat(filtered1.filter((item) => {
                            return item.type == type[i];
                        }))
                    }
                    console.log(filtered2)
                    final = filtered2
                }else if(items.length == 0 && orders.length && type.length){
                    filtered1 = []; filtered2 = []
                    for (let i = 0; i < orders.length; i++){
                        filtered1 = filtered1.concat(result.filter((item) => {
                            return item.order == orders[i];
                        }))
                    }
                    for (let i = 0; i < type.length; i++){
                        filtered2 = filtered2.concat(filtered1.filter((item) => {
                            return item.type == type[i];
                        }))
                    }
                    console.log(filtered2)
                    final = filtered2
                }else if (items.length && orders.length && type.length){
                    filtered1 = []; filtered2 = []; filtered3 = []
                    for (let i = 0; i < items.length; i++){
                        filtered1 = filtered1.concat(result.filter((item) => {
                            return item.item == items[i];
                        }))
                    }
                    for (let i = 0; i < orders.length; i++){
                        filtered2 = filtered2.concat(filtered1.filter((item) => {
                            return item.order == orders[i];
                        }))
                    }
                    for (let i = 0; i < type.length; i++){
                        filtered3 = filtered3.concat(filtered2.filter((item) => {
                            return item.type == type[i];
                        }))
                    }
                    console.log(filtered3);
                    final = filtered3
                }else if (items.length == 0 && orders.length == 0 && type.length == 0){
                    final = result
                }
                props.handSetFinal(final);
            });
        }
    }
    
    return (
        <div id="mySidenav" style={{
            width: props.toggle ? '376px' : '0px'
        }} className="sidenav">
            <div className="top-nav">
                <div onClick={props.handleClick} className="menu-icon">&#9776;</div>
                <div className="header">
                    <h4>Set Parameters</h4>
                    <p>3 parameters available</p>
                </div>
                <div className="reset">
                    <p onClick={props.clear}>Reset all</p>
                </div>
            </div>
            <div className="side-body">
                <div className="item">
                    Item
                    <div style={{
                            border: (error.item) ? '1px solid red' : '1px solid #3D92EC'
                        }}  className="text-area">
                        <textarea onChange={handleChange} name="item" id="item" cols="40" rows="8"></textarea>
                    </div>
                    <p className="error">{
                        error.item? "Enter a number" : ""
                    }</p>
                </div>
                <div className="order">
                    Order
                    <div style={{
                            border: (error.order) ? '1px solid red' : '1px solid #3D92EC'
                        }} className="text-area">
                        <textarea onChange={handleChange} name="order" id="order" cols="40" rows="8"></textarea>
                    </div>
                    <p className="error">{
                        error.order? "Enter a number" : ""
                    }</p>
                </div>
                <div className="3rd">
                    Type
                    <div className="">
                        <div className="cao">
                            <input onChange={handleCheckbox} type="checkbox" name="type" value="cao"/> CAO
                        </div>
                        <div className="edf">
                            <input onChange={handleCheckbox} type="checkbox" name="type" value="edf"/> EDF
                        </div>
                        <div className="sfo">
                            <input onChange={handleCheckbox} type="checkbox" name="type" value="sfo"/> SFO
                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={handleSubmit} >Filter</button>
                </div>
            </div>
        </div>
    )
}
