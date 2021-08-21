import Reach from 'react';

const Button = ({type,name,id,disabled,value})=>{
	
	return (<button type={type} name={name} id={id} disabled={disabled} >{value}</button>)
}

export default Button;