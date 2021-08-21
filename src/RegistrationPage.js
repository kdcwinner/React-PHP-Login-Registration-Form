import React,{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './commonComponents/Input';
import Button from './commonComponents/Button';
import Textarea from './commonComponents/Textarea';


const RegistrationPage = (props) => {

	const [registrationFields,setRegistrationFields] = useState({});
    const [registrationErrors,setRegistrationErrors] = useState({});
    const [successMsg,setSuccessMsg] = useState('');

	const handleSubmit = (e)=>{
		e.preventDefault();
        if(validationForm()){
            axios.post(`http://practice.local/api/server.php`, { first_name:registrationFields.fname,last_name:registrationFields.lname,email:registrationFields.email,dob:registrationFields.dob,rpass:registrationFields.rpass,cpass:registrationFields.cpass,address:registrationFields.address,reg_user:1,gender:registrationFields.gender })
      .then(res => {
        //console.log(res);
        console.log(res.data);
            if(res.data.success == true){
                setTimeout(function(){
                setSuccessMsg('Registration Successfully!');
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


		
//		const { name,value } = 
	}

    const validationForm = () => {
        const fields = registrationFields;
        let errors = {};
        let isError = true;

        if(!fields['fname']){
            errors['fname'] = 'Please enter fname!';console.log("fname blank");
            isError = false;
        }
        if(fields['fname']){
            if(fields['fname'].length <= 2){
                errors['fname'] = 'Fname must be more than 2 characters!'
                isError = false;
            }
        }
        if(!fields['lname']){
            errors['lname'] = 'Please enter lname';
            isError = false;
        }
        if(fields['lname']){
            if(fields['lname'].length <=2 ){
                errors['lname'] = 'Lname must be more than 2 characters!';
                isError = false;
            }
        }
        if(!fields['email']){
            errors['email'] = 'Please enter email!';
            isError = false;
        }
        if(fields['email']){
            let rexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(!rexEmail.test(String(fields['email']).toLowerCase())){
                errors['email'] = "Please enter valid email!";
                isError = false;
            }
            if(fields['email'].length>25){
                errors['email'] = 'Email can not be more than 25 characters!';
                isError = false;
            }
        }
        if(!fields['dob']){
            errors['dob'] = 'Please select Date of Birth!';
            isError = false;
        }
        if(!fields['gender']){
            errors['gender'] = 'Please select gender!';
            isError = false;
        }
        if(!fields['rpass']){
            errors['rpass'] = 'Please enter password!';
            isError = false;
        }
        if(fields['rpass']){
            let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if(!regPass.test(String(fields['rpass']))){
                errors['rpass'] = 'Please enter strong password,Strong password must contain at least on small letter,one capital letter,one spaical character and one digit as well as it must be at least 8 characters!';
                isError = false;
            }
        }
        if(!fields['cpass']){
            errors['cpass'] = 'Please enter Confirm Password!';
            isError = false;
        }
        if(fields['rpass'] && fields['cpass']){
            if(fields['rpass'] != fields['cpass']){
                errors['cpass'] = 'Confirm passowrd must be same as password!';
                isError = false;
            }
        }
        if(!fields['address']){
            errors['address'] = 'Please enter address!';
            isError = false;
        }
        setRegistrationErrors(errors);
        return isError;
    }

	const handledInput = (e)=>{
		const { name,value } = e.target;
        registrationFields[name] = value;
		console.log("name & value :"+name + "---"+value);
        setRegistrationFields(registrationFields);

	};
	return (
		<div class="page-container">

		<div id="register-form">        
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Register</legend>
                    <span style={{ color: 'red' }}>{successMsg}</span>
                    <ul>
                        <li><label>First name:</label></li>
                        <li><Input handleChanged={handledInput} type="text" id="fname" name="fname" />
                        { registrationErrors.fname }</li>
                        <li><label>Last name:</label></li>
                        <li><Input  handleChanged={handledInput} type="text" id="lname" name="lname" />
                        { registrationErrors.lname }</li>
                        <li><label>Email:</label></li>
                        <li><Input  handleChanged={handledInput} type="text" id="email" name="email" />
                        { registrationErrors.email }</li>
                        <li><label>Birth Date:</label></li>
                        <li><Input handleChanged={handledInput} type="date" id="dob" name="dob" />
                        { registrationErrors.dob }</li>
                        <li><label>Gender:</label></li>
                        <li><Input handleChanged={handledInput} type="radio" name="gender" id="male" value="1"/>
                        <label for="male">Male</label> 
                        <Input type="radio"  handleChanged={handledInput} name="gender" id="female" value="0" />
                        <label for="female">Female</label>
                        { registrationErrors.gender }</li>
                        <li><label>Password:</label></li>
                        <li><Input  handleChanged={handledInput} type="passowrd" id="rpass" name="rpass" />
                        { registrationErrors.rpass }</li>
                        <li><label>Confirm Password:</label></li>
                        <li><Input  handleChanged={handledInput} type="password" id="cpass" name="cpass" />
                        { registrationErrors.cpass }</li>
                        <li><label>Address:</label></li>
                        <li><Textarea name="address" id="address" handleChanged={handledInput} ></Textarea>
                        {registrationErrors.address }</li>
                    </ul>
                    <Button type="submit" name="submit" value="Submit" />
                    <div style={{ textAlign:'right' }}> Already Registered ? <Link to="/">Login</Link></div>
                </fieldset>
            </form>
        </div>
        </div>
		);
}

export default RegistrationPage;