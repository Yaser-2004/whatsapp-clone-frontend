import React, {useEffect, useRef, useState} from 'react'
import "./Chat.css"
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import Message from '../Message/Message';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import useConversation from '../../zustand/useConversation';
import useSendMessage from '../../Hooks/useSendMessage';
import useGetMessages from '../../Hooks/useGetMessages';
import useListenMessages from '../../Hooks/useListenMessages';
import {Oval} from "react-loader-spinner";

function Chat() {

    const [change, setChange] = useState(false);
    const [message, setMessage] = useState("");
    const {selectedConversation, setSelectedConversation} = useConversation();
    const {loading, sendMessage} = useSendMessage();
    useListenMessages();

    // function handleChange(e) {
    //     //console.log(e.target.value);
    //     if (e.target.value) {
    //         setChange(true);
    //         setMessage(e.target.value);
    //     } else {
    //         setChange(false);
    //     }
    // }
    //console.log(selectedConversation);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!message) return;
        await sendMessage(message);
        setMessage("");

    }

    const {messages, loadingg} = useGetMessages();
    //console.log(messages);

    const lastMessageRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
        }, 100);
    }, [messages])



    return (
        <div className='Chat'>
            <div className='Chat__header'>
                <Avatar src={selectedConversation?.avatar} />
                <div className='Chat__name'>
                    <p>{selectedConversation?.name}</p>
                </div>
                <div className='Chat__icons'>
                    <IconButton><SearchIcon color='action' /></IconButton>
                    <IconButton><MoreVertIcon color='action' /></IconButton>
                </div>
            </div>

            <div className='Chat__messages'>
                {selectedConversation ?
                <div className="invisible">

                    {!loadingg && messages.length === 0 ? <p className='no_messages'>No messages, Say Hello!</p> : null}

                    {loadingg && <div className='spinner_in_chat'><Oval /></div>}

                    {!loading && messages.length > 0 && messages.map((message, index) => {
                        return (
                            <div ref={lastMessageRef} key={index+1}>
                                <Message message={message} />
                            </div>
                        )
                    })}
                    
                </div>
                : <div className='invisible_1'>
                    <p>Start conversation :)</p>
                    </div>}

                <div className='Chat_footer'>
                    <IconButton style={{marginLeft: "10px"}}><InsertEmoticonIcon color='action' /></IconButton>
                    <IconButton style={{marginRight: "15px"}}><AddIcon color='action' /></IconButton>
                    <form onSubmit={handleSubmit}>
                        <input value={message} type="text" name='message' placeholder='Type a message' className='type__text' 
                        onChange={(e) => {
                            setMessage(e.target.value)
                            if (e.target.value === "") {
                                setChange(false);
                            } else {
                                setChange(true);
                            }
                        }} 
                        />
                        <button style={{border: "none", display: (!change ? "none": null)}} type='submit'>
                            <IconButton style={{marginLeft: "10px"}}><SendIcon color='action' /></IconButton>
                        </button>
                    </form>
                    <IconButton><MicIcon color='action' /></IconButton>
                </div>
            </div>

        </div>
    )
}

export default Chat