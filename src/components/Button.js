import React from 'react';

function Button(props) {
	const { sign,makeCounter,setcount,count } = props;
  return (<button  onClick={ () => setcount(10+count)} name={sign}>{sign}</button>)	
}

export default Button;