import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useGetMessages = () => {
    const [loadingg, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    const url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const result = await axios.get(`${url}/api/messages/${selectedConversation._id}`);
                const data = await result.data;

                setMessages(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages])

    return {messages, loadingg};
}

export default useGetMessages;