import { useState } from "react";
import useForceUpdate from 'use-force-update';


const Home = () => {

    const [data, setData] = useState([]);
    const [chield, setChield] = useState([]);
    const [show, setShow] = useState([]);
    const forceUpdate = useForceUpdate();

    // add file in data array
    const addfield = async() => {
        const obj = {
            id: data.length + 1,
            name: 'Field Name',
            type:'',
            chield : []
        }
        await data.push(obj);
        await setData(data);
        // console.log('++++++', data); 
        forceUpdate();
    }

    // name changed for the file
    const nameChanged = async(e,id) => {
         data[id-1].name = e.target.value ;
        //  console.log("data changed done", data[id-1].name, data);  
         await setData(data);
         forceUpdate();
    }

    // type changed
    const typeChanged =(e, id) => {
        console.log('typechanged ', e.target.value);
        data[id-1].type = e.target.value;
        if(e.target.value === "Object"){
            show[id-1] = true;
            forceUpdate();
        } else{
            show[id-1] = false;
            forceUpdate();
        }
        console.log('data ', data);

    }

    // Delete function
    const deleteData = (id) => {
        const arr = data.filter((item)=> item.id !== id);
        setData(arr);
        forceUpdate();
    }

    // add chield to parent file
    const addfieldChield = async(id) => {
        const obj = {
            id: chield.length + 1,
            name: 'chield Field Name',
            type:'',
            chield : []
        }
        await chield.push(obj);
        data[id-1].chield.push(obj);
        forceUpdate();
        console.log('chield added function --->', data , chield);
    }

       // name changed for the file chield
       const nameChildChanged = async(e,d_id,c_id) => {
        data[d_id - 1].chield[c_id-1].name = e.target.value;
        chield[c_id-1].name = e.target.value ;
       //  console.log("data changed done", data[id-1].name, data);  
        forceUpdate();
   }

   // chield type changed
   const typeChieldChanged =(e,d_id, c_id) => {
    data[d_id-1].chield[c_id-1].type = e.target.value;
    chield[c_id-1].type = e.target.value;
    if(e.target.value === "Object"){
        show[100+c_id-1] = true;
        forceUpdate();
    } else{
        show[100+c_id-1] = false;
        forceUpdate();
    }
    console.log('data ', data);
 
    } 

    // delete child using parent id array
    const deleteDataChield = async(d_id,c_id) => {
        // chield deleted from data set array
        data.forEach((i) =>
            {if(i.id === d_id){
             const arr = i.chield.filter((val) => val.id !== c_id);
             i.chield = arr ;
            //  console.log('item--lll', data ,arr);  
            }}
        )
        forceUpdate();
        // delete from chield array
        const c_array = chield.filter((val) => val.id !== c_id);
        setChield(c_array);
    }

    
    return (
        <div className="Home">
            <div className="span-div">
                <span>File Name</span>
                <span>Type</span>
                <img src="https://cdn-icons-png.flaticon.com/128/1828/1828817.png" onClick={()=> addfield()} alt="add-icon"/>
            </div>
            {data.length === 0 && <p>add new file</p>}
            <ol>
            {
                data.map((item) => (
                    <div className="li-data-div">
                        <li>
                        <div className="data-div">
                            <input type="text" value={item.name} onChange={(e)=>nameChanged(e,item.id)}/>
                            <select onChange={(e)=>typeChanged(e,item.id)}>
                                <option value="String" default>String</option>
                                <option value="Boolean">Boolean</option>
                                <option value="Number">Number</option>
                                <option value="Object">Object</option>
                            </select>

                            {show[item.id-1] ? <img src="https://cdn-icons-png.flaticon.com/128/4210/4210903.png" onClick={()=> addfieldChield(item.id)} alt="add-icon"/> : null }

                            
                            <img src="https://cdn-icons-png.flaticon.com/128/458/458594.png" onClick={()=> deleteData(item.id)} alt="del-icon" />
                            
                        </div>

                        <div className="chield-div">
                            <ol>
                            {
                                item.chield.map((value) => (
                                    <div className="li-chield-div">
                                        <li>
                                        <input type="text" value={value.name} onChange={(e)=>nameChildChanged(e,item.id,value.id)}/>
                                        <select onChange={(e)=>typeChieldChanged(e,item.id,value.id)}>
                                            <option value="String" default>String</option>
                                            <option value="Boolean">Boolean</option>
                                            <option value="Number">Number</option>
                                            <option value="Object">Object</option>
                                        </select>

                                        {show[100+value.id-1] ? <img src="https://cdn-icons-png.flaticon.com/128/1057/1057061.png" onClick={()=> addfieldChield(item.id)} alt="add-icon"/> : null }
                                        {/* <img src="https://cdn-icons-png.flaticon.com/128/1057/1057061.png" onClick={()=> addfieldChield(item.id)} alt="add-icon"/> */}
                                        <img src="https://cdn-icons-png.flaticon.com/128/9153/9153963.png" onClick={()=> deleteDataChield(item.id,value.id)} alt="del-icon" />
                                        </li>
                                    </div>
                                ))
                            }
                            </ol>
                            
                        </div>
                        </li>
                    </div>
                ))
            }
            </ol>
        </div>
    )
}

export default Home;
