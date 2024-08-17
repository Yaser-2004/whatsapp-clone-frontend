import React from 'react'
import "./SidebarChat.css"
import Avatar from '@mui/material/Avatar';
import useConversation from '../../zustand/useConversation';
import axios from 'axios';
import { useSocketContext } from '../../context/SocketContext';
import useGetConversations from '../../Hooks/useGetConversations';

function SidebarChat({conversation}) {

    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    //console.log("conversation >>>", conversation);

    function messagesAndConvos() {
        setSelectedConversation(conversation);

        // async function getConversation() {
        //     if (selectedConversation) {
        //         const convoId = selectedConversation?._id;
        //         try {
        //             const result = await axios.get(`http://localhost:4000/api/messages/${convoId}`);
        //             console.log(result.data);
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // }

        // getConversation();
    }

    return (
        <div className='sidebarChat' onClick={messagesAndConvos} style={isSelected ? {backgroundColor: "#F0F2F5"}: null}>
            <Avatar src={conversation.avatar} style={{position: "relative"}} />
            <div className='online_circle' style={isOnline ? {position: "sticky", height: "10px", width: "10px", backgroundColor: "lightgreen", borderRadius: "50%", marginTop: "-30px", marginLeft: "-8px"} : null} ></div>
            <div className='side__detail'>
                <p>{conversation.name}</p>
                <p></p>
            </div>
            
        </div>
    )
}

export default SidebarChat
