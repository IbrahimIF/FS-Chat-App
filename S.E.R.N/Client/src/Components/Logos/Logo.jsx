import { useState, useEffect } from 'react';
import './Logo.css';
import Express from '../../assets/Express.png';
import Socket from '../../assets/Socket_1.png';
import Node from '../../assets/Node.png';
import Reacts from '../../assets/React.png';

function Logo() {

  return (
    <> 
    <div className='logo-Container'>
      <img src={Socket} className="logo socket" alt="Socket logo" />
      <img src={Express} className="logo express" alt="Express logo" />
      <img src={Reacts} className="logo react" alt="Reacts logo" />
      <img src={Node} className="logo node" alt="Node logo" />
    </div>
    </>
  );
}

export default Logo;