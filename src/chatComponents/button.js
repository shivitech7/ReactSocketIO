import React, {useEffect, useState} from 'react';
const MyButton = (title, onclick) => {
 
  return (
      <div>
    <button style={{background: 'red', backgroundColor: 'red'}}>{title}</button>
    </div>
  );
}

export default MyButton;
