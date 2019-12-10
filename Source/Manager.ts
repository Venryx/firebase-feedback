import { LogTypes } from "./Utils/General/Logging";
import {Action} from "./Utils/General/Action";
import {BaseComponent} from "react-vextensions";
import {CE} from "js-vextensions";

export class PermissionGroupSet {
	basic: boolean;
	verified: boolean;
	mod: boolean;
	admin: boolean;
}

export type Link_Props = {
	onClick?, style?,
	text?: string, to?: string, target?: string, replace?: boolean, // url-based
	actions?: Action<any>[], //updateURLOnActions?: boolean, // action-based
} & React.HTMLProps<HTMLAnchorElement>;

export type User = {
	_key?: string;
	avatarUrl: string;
	displayName: string;
	email: string;
	providerData: UserInfo[];
};
export type UserInfo = {
	displayName: string;
	email: string;
	photoURL: string;
	providerId: string;
	uid: string;
};

export class Manager {
	Populate(data: Omit<Manager, "Populate" | "store">) {
		CE(this).Extend(data);
		OnPopulated_listeners.forEach(a=>a());
	}

	GetStore: ()=>any;
	get store() { return this.GetStore(); }
	dbPath: string;
	/*storePath_mainData: string;
	storePath_dbData: string;*/
	Link: new ()=>BaseComponent<Link_Props, {}>
		& {render: ()=>JSX.Element | null}; // temp fix for typing issue ("render" returning Element | null | false, in one version)
	FormatTime: (time: number, formatStr: string)=>string;

	logTypes = new LogTypes();

	ShowSignInPopup: ()=>void;
	GetUserID: ()=>string;
	GetUser: (id: string)=>User;
	GetUserPermissionGroups: (userID: string)=>PermissionGroupSet;

	MarkdownRenderer: any; //(...props: any[])=>JSX.Element;
}
export const manager = new Manager();

export let OnPopulated_listeners = [];
export function OnPopulated(listener: ()=>any) { OnPopulated_listeners.push(listener); }