import React from 'react'
import "./Message.css"
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';

function Message({message}) {
    //let date = new Date();

    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();

    let date = new Date(message?.createdAt);
    
    let formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    let formattedTime = formatter.format(date);
    //console.log("sentToUser is >>>>", !sentToUser);
    return (
        <div className='Message' id={message?.senderId === authUser._id? 'sender' : null} >
            <p style={{fontSize: "16px", marginRight: "0px"}}>{message?.message}</p>
            <p style={{textAlign: "right", fontSize: "11px", color: "grey", width: "60px"}}>{formattedTime}</p>
        </div>
    )
}

export default Message
