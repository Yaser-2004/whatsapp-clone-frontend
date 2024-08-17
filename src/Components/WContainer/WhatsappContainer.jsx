import React, { useState } from 'react'
import "./WhatsappContainer.css"
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AddCommentIcon from '@mui/icons-material/AddComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from '../SidebarChats/SidebarChat';
import Chat from '../Chat/Chat';
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import useGetConversations from '../../Hooks/useGetConversations';
import useConversation from '../../zustand/useConversation';

function WhatsappContainer() {

    const [click, setClick] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();
    const url = process.env.REACT_APP_BASE_URL;
    
    async function userLogout() {
        try {
            await axios.post(`${url}/api/auth/logout`)
                    .then(result => {
                        if (result.data) {
                            localStorage.removeItem("chat-user");
                            setAuthUser(null);
                            
                        }
                        toast.success("Logged out successfully");
                    })
        } catch (error) {
            console.log(error);
        }
    }

    const {loading, conversations} = useGetConversations();

    return (
        <div className='whatsapp__container'>
            <div className='container__persons'>
                <div className='persons__header'>
                    <div className='persons__header__avatar'>
                        <Avatar src={authUser.avatar} />
                        <p>Welcome {authUser.name}</p>
                    </div>

                    <div className='persons__header__icons'>
                        <IconButton><GroupsIcon color='action' /></IconButton>
                        <IconButton><DonutLargeIcon color='action' /></IconButton>
                        <IconButton><AddCommentIcon color='action' /></IconButton>
                        <div className='more_button' onClick={e => {setClick(!click)}}><IconButton><MoreVertIcon color='action' /></IconButton></div>
                        <button className='logout__button' onClick={userLogout} style={click === false ? {display: "none"} : null }>Log Out</button>
                    </div>

                </div>

                <div className="search">
                    <div><SearchIcon color='action' fontSize='small' /></div>
                    <input type="text" placeholder='Search' />
                </div>

                <div className='sidebar__chats'>
                    {conversations?.map((convo, index) => {
                        return <SidebarChat conversation={convo} key={index+1} />;
                    })}
                </div>
            </div>


            <div className='container__chat'>
                <Chat />
            </div>
        </div>
    )
}

export default WhatsappContainer
