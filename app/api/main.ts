import { Axios } from "./axios";

const search = async({ queryKey}: any ) => {
    const [_, search] = queryKey;
    if (search.search.length < 2) { 
        return '[]';
    }
    
    const { data } = await Axios.post("/app/search?page=1&limit=50", search);
    return data;
}


const muteNotifications = async(payload: any) => {  
    const { data } = await Axios.post("/app/mute-notifications", payload);
    return data;
}


const unreadNotifications = async() => {  
    const { data } = await Axios.get("/app/unread-notifications");
    return data?.notifications;
}

const clearUnReadNotifications = async(payload: any) => {  
    const { data } = await Axios.get(`/app/clear-unread-notifications/${payload.source}`);
    return data;
}


export const main = {
    search,
    muteNotifications,
    unreadNotifications,
    clearUnReadNotifications
}