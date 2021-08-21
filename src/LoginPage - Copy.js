import React,{ useState } from 'react';
import axios from 'axios';



function LoginPage() {
	const [credentials,setCredentials] = useState({"username":"","password":""});
	const [persons,setPersons] = useState([]);

	const [successMsg,setSuccessMsg] = useState('');
	const loginSubmit = (e)=>{
		e.preventDefault();
		let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;


		setCredentials({"username":username,"password":password});
		console.log(credentials);

		axios.post(`https://jsonplaceholder.typicode.com/users`, { username })
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
      })

	};
	return (
		<div>
		    <h2>Modal Login Form</h2>    
		    <div id="id01zz" className="modal11">  
		    	
		        <form className="modal-content animate" onSubmit={loginSubmit} >
		        	<label><h2>{ successMsg }</h2></label>
		            <div className="container">
		                <label><b>Username</b></label>
		                <input type="text" placeholder="Enter Username" name="name" id="username" required />		  
		                <label><b>Password</b></label>
		                <input type="password" placeholder="Enter Password" name="password" id="password" required />		  
		                <button type="submit" >Login</button>
		                <input type="checkbox" checked="checked" /> Remember me
		            </div>		  
		            <div className="container" >
		                <button type="button"  className="cancelbtn">Cancel</button>
		                <span class="psw">Forgot <a href="#">password?</a></span>
		            </div>
		        </form>
		    </div>
    	</div>
	);
}

export default LoginPage;

