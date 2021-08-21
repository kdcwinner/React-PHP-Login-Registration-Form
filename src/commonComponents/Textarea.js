import React from 'react';


const Textarea = ({type,id,name,className,value,handleChanged,required}) => {
	
	
	return (<textarea id={id} name={name} className={className}  onChange={handleChanged}  required={required} >{value}</textarea>);

};

export default Textarea;