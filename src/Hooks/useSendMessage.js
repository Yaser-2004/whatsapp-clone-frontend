import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    const url = process.env.REACT_APP_BASE_URL;

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const result = await axios.post(`${url}/api/messages/send/${selectedConversation._id}`, {
                message: message
            })
            const data = await result.data;

            setMessages([...messages, data]);
            console.log(messages);


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {sendMessage, loading};

}

export default useSendMessage;