import React,{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './commonComponents/Input';
import Button from './commonComponents/Button';

function LoginPage() {
	const [credentials,setCredentials] = useState({"username":"","password":""});
	const [persons,setPersons] = useState([]);
  const [fields,setFields] = useState({});
  const [errors,setErrors] = useState({});
	const [successMsg,setSuccessMsg] = useState('');


  const handleData = (e)=>{
    const { name , value } = e.target;
    console.log("Name:",name);
    fields[name] = value;
    setFields(fields);   
    console.log(fields);
  };

  
	const loginSubmit = (e)=>{
		e.preventDefault();
     if(validateData()){
      console.log("in validateData if condition");
      console.log(fields);
      console.log(errors);

      axios.post(`http://practice.local/api/server.php`, { email:fields.uname,password:fields.lpass,req_login:1 })
      .then(res => {
        //console.log(res);
        console.log(res.data);
            if(res.data.success == true){
                setTimeout(function(){
                setSuccessMsg('Login Successfully!');
            },1000);
        }else{
            setSuccessMsg(res.data.data);
        }
        //setSuccessMsg('');
      }).catch(error => {
            setSuccessMsg(error.data.data);
            console.error('There was an error!', error.data.data);
        });
    }
		/*let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;


		setCredentials({"username":username,"password":password});
		console.log(credentials);*/

		/*axios.post(`https://jsonplaceholder.typicode.com/users`, { username })
      .then(res => {
        console.log(res);
        console.log(res.data.id);
	        if(res.data.id){
	        	setTimeout(function(){
	        	setSuccessMsg('Login Successfully!');
	        },1000);
        }
        setSuccessMsg('');
      });

      axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        setPersons( persons);
        console.log(persons);
      })*/

	};
  const validateData = ()=>{
    let field = fields;
    let errors = {};
    let isError = true;
    if(!field['uname']){
      errors['uname']= "Please enter uname";
      isError =false;
    }

    if(!field['lpass']){
      errors['lpass']= "Please enter lpass";
      isError =false;
    }
    setErrors(errors);
    return isError;

  }
	return (
		<div className="page-container">
		    <div id="login-form">
            <form onSubmit={loginSubmit} action="">
            <fieldset>
                <legend>Login</legend>
                <span style={{ color: 'red' }}>{successMsg}</span>
                <ul>
                    <li><label>User name:</label></li>
                    <li><Input type="text" id="uname" name="uname" handleChanged={handleData}  />
                    {  errors.uname }</li>
                    <li><label>Password:</label></li>
                    <li><Input type="password" id="lpass" name="lpass"  handleChanged={handleData} />
                    {  errors.lpass }</li>
                </ul>
                <Button type="submit" name="submit" value="Submit" />
                New user ? <Link to="/registration">Register</Link>
            </fieldset>
            </form>
        </div>
    	</div>
	);
}

export default LoginPage;

