export class Event {

    static async getAllCards() {
        try {
            const response = await fetch("http://localhost:3000/events");
            const data = await response.json();
            const eventArray = data.map(element => new Event(element.type, element.title,
                element.date, element.startTime, element.endTime, element.location, element.url, element.description));

            eventArray.sort((a, b) => new Date(b.date) - new Date(a.date));

            return eventArray;
        } catch (error) {
            console.error("Error fetching event data:", error);
            throw error;
        }
    }

    constructor(type, title, date, startTime, endTime, location, url, description) {
        this.type = type;
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.url = url;
        this.description = description;
    }

    daysDifference() {
        const currentDate = new Date();
        const daysDifference = Math.ceil((new Date(this.date) - currentDate) / (1000 * 60 * 60 * 24));
        if (daysDifference == 0) {
            return "Today";
        } else if (daysDifference < 0) {
            return "Too late";
        }
        const day = daysDifference == 1 ? ' day' : ' days';
        return daysDifference + day;
    }
}
