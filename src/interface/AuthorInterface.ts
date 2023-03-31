import { IsocialMedia } from "./SocialMediaInterface";
import { IUser } from "./UserInterface";

export interface IAuthor {
    id: number;
    authorProfile?:string;
    nameProfile?: string;
    authorName: string;
    birthDate: string;
    age: number;
    followers?: Array<IUser>
    followersId?: number;
    socialMedia?: Array<IsocialMedia>;
    socialMediaId?: Array<IsocialMedia>;
    biography?:string;
    createdAt: Date;
    updatedAt: Date;
}


