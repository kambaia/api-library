import { IAuthor } from "./AuthorInterface";
import { ICategory } from "./CategoryInterface";
import { IUser } from "./UserInterface";

export interface IBook{
    id: number;
    cover?:string;
    nameCover?: string;
    title: string;
    publishLocation: string;
    issueDate: string;
    PublishingCompany: string
    language: string
    bookCode: string
    boxSize: number;
    textReading: boolean;
    numberOfpage: number;
    active: boolean;
    yearOfLaunch: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId: number;
    documentId: number,
    id_authorId: number;
    representativeUserId: number;
}


