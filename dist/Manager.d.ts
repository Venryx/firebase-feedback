/// <reference types="react" />
import { LogTypes } from "./Utils/General/Logging";
import { Action } from "./Utils/General/Action";
import { BaseComponent } from "react-vextensions";
export declare class PermissionGroupSet {
    basic: boolean;
    verified: boolean;
    mod: boolean;
    admin: boolean;
}
export declare type Link_Props = {
    onClick?: any;
    style?: any;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actions?: Action<any>[];
} & React.HTMLProps<HTMLAnchorElement>;
export declare type User = {
    _key?: string;
    avatarUrl: string;
    displayName: string;
    email: string;
    providerData: UserInfo[];
};
export declare type UserInfo = {
    displayName: string;
    email: string;
    photoURL: string;
    providerId: string;
    uid: string;
};
export declare class Manager {
    Populate(data: Omit<Manager, "Populate" | "store">): void;
    GetStore: () => any;
    get store(): any;
    dbPath: string;
    Link: new () => BaseComponent<Link_Props, {}> & {
        render: () => JSX.Element | null;
    };
    FormatTime: (time: number, formatStr: string) => string;
    logTypes: LogTypes;
    ShowSignInPopup: () => void;
    GetUserID: () => string;
    GetUser: (id: string) => User;
    GetUserPermissionGroups: (userID: string) => PermissionGroupSet;
    MarkdownRenderer: any;
}
export declare const manager: Manager;
export declare let OnPopulated_listeners: any[];
export declare function OnPopulated(listener: () => any): void;
