import { IFixed, IPagination, IRequest, ISorter } from 'types/types';

export type TGender = "MALE" | "FEMALE";

export interface IUserItem {
	readonly id: number,
	name?: string,
	surname?: string,
	patronymic?: string,
	email?: string,
	phone?: string,
	gender?: TGender,
	login?: string,
};

export interface IUser {
	data: IUserItem[],
	pagination: IPagination,
	sorters: ISorter[],
	hiddens: string[],
	fixeds: IFixed[],
	get: IRequest,
	loading: boolean,
};
