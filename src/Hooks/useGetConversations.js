import { useEffect, useState } from "react";
import axios from "axios";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversation] = useState();
    axios.defaults.withCredentials = true;
    const url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            
            try {
                //axios.defaults.withCredentials = true; //important to store the cookies
                const result = await axios.get(`${url}/api/users`, {
                    withCredentials: true
                });
                setConversation(result.data);
    
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getConversations();
    }, []);

    return {loading, conversations};
}

export default useGetConversations;