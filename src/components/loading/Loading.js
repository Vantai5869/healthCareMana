import React from 'react';
import ReactLoading from 'react-loading';
import './styles.scss';

const Loading = ({ type, color }) => (
    <div className='loading'>
     <ReactLoading type={type} color={color} height={'5%'} width={'5%'} />
    </div>
);
 
export default Loading;