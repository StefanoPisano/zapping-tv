export class Show {
    title: string;
    startsAt: string;
    date: Date;
    streamingLink: string | null;

    constructor(title: string, startsAt: string, date: Date = new Date(), streamingLink: string | null = null) {
        this.title = title;
        this.startsAt = startsAt;
        this.date = date;
        this.streamingLink = streamingLink;
    }
}