import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  const [data,setData] =useState([]);

  const[firstName,setFirstName] = useState('')
  const[lastName,setLastName] = useState('')
  const[age,setage] = useState(0)
  const[id,setid] = useState(0)
  const[isupdate,setUpdate]=useState(false)


  useEffect(() => {
    setData(Card)
  },[]);

  const handleEdit = (id)=>{
    const dt=data.filter(item => item.id ==id);
    if(dt !==undefined)
    {
      setUpdate(true)
      setid(dt[0].id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setage(dt[0].age);
    }
  }
  const handleDelete = (id)=>{
    if(id > 0){
      if(window.confirm("are you sure to delete this item..."))
      {
      const dt=data.filter(item=>item.id !==id);
      setData(dt);
      }
    }

  }
  const handleSave = (e) => {
    let error='';

    if( firstName ==='')
    error += 'firstname is required, ' ;

    if( lastName ==='')
    error += 'lastname is required, ';

    if( age <=0)
    error += 'age is required, ';
  
    if(error ==='')
    {

    e.preventDefault();
    const dt= [...data];
    const newObject={
      id:Card.length+1,
      firstName:firstName,
      lastName:lastName,
      age: age,
    }
    dt.push(newObject);
    setData(dt);

  }
  else{
    alert(error);
  }
  }
  const handleClear = () => {
    setid(0);
      setFirstName('');
      setLastName('');
      setage('');
      setUpdate(false);
  }
  const handleUpdate = () => {
    const index=data.map((item)=>{
      return item.id
    }).indexOf(id);

    const dt=[...data];
    dt[index].firstName= firstName;
    dt[index].lastName= lastName;
    dt[index].age= age;

    setData(dt);
    handleClear();

  }

  return (
    <>
    <div style={{display:'flex',justifyContent:'center',marginTop:'10px',marginBottom:'10px',padding:'10px'}}>
    <div>
        <label>id:
          <input type='text' placeholder='id' onChange={(e)=>setid(e.target.value)} value={id}></input>
        </label>
      </div><br></br>
      <div>
        <label>First Name:
          <input type='text' placeholder='Enter first name' onChange={(e)=>setFirstName(e.target.value)} value={firstName}></input>
        </label>
      </div> <br></br>
      <div>
        <label>Last Name:
          <input type='text' placeholder='Enter last name' onChange={(e)=>setLastName(e.target.value)} value={lastName}></input>
        </label>
      </div> <br></br>
      <div>
        <label>age:
          <input type='text' placeholder='Enter age' onChange={(e)=>setage(e.target.value)} value={age}></input>
        </label> 
      </div> <br></br>
      <div>
        {
          !isupdate ?
          <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button>
          :
          <button className='btn btn-primary' onClick={()=>handleUpdate()}>Update</button>

        }
      <button className='btn btn-danger' onClick={()=>handleClear()}>Clear</button>
      </div>
    </div>
    
        <table className='table table-hover'>
          <thead>
            <tr>
              <td>Sr.No</td>
              <td>Id</td>
              <td>firstName</td>
              <td>lastName</td>
              <td>age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>
                      <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
                      <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>

                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      
    </>
    
  );
}

export default App;