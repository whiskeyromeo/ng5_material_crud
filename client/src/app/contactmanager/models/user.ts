import { Note } from './note';

export class User {
    _id: String;
    birthDate: Date;
    startTime: String;
    endDate: Date;
    name: string;
    avatar: string;
    bio: string;
    notes: Note[];
}
