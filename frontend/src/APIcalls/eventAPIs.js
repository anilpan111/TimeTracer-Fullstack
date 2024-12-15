import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export class EventAPIs{
    async loadEvents(){
        try {
            const eventResponse = await axios.get(`${baseURL}/api/v1/event/loadEvents`,
                {
                    withCredentials: true
                }
            )

            return eventResponse.data;
        } catch (error) {
            throw error
        }
    }
    async createEvent(event){
        try {
            const eventCreationResponse = await axios.post(`${baseURL}/api/v1/event/addEvent`,
                {
                    eventName: event.title,
                    eventType :event.eventType,
                    startTime: event.start,
                    endTime: event.end,
                },
                {
                    withCredentials:true,
                }
            )

            return eventCreationResponse.data
        } catch (error) {
            throw error
        }
    }

    async loadOneEvent(eventId){
        try {
            const response= await axios.post(`${baseURL}/api/v1/event/loadOneEvent`,
                {eventId},
                {withCredentials: true}
            )

            return response.data;
        } catch (error) {
            throw error
        }
    }
    async resetDuration({eventId,completedDuration}){
        try {
            const response = await axios.post(`${baseURL}/api/v1/event/resetDuration`,
                {eventId,completedDuration},
                {withCredentials: true}
            )

            return response.data
        } catch (error) {
            throw error;
        }
    }
}



const eventAPIs = new EventAPIs();
export default eventAPIs;