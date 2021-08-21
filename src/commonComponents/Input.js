import React from 'react';


const Input = ({type,id,name,className,value,handleChanged,required}) => {
	
	
	return (<input type={type} id={id} name={name} className={className} value={value} onChange={handleChanged}  required={required} />);

};

export default Input;