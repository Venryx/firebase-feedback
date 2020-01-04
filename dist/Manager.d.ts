/// <reference types="react" />
import { LogTypes } from "./Utils/General/Logging";
import { RootState } from "./Store";
export declare class PermissionGroupSet {
    basic: boolean;
    verified: boolean;
    mod: boolean;
    admin: boolean;
}
export declare type ActionFunc<StoreType> = (store: StoreType) => void;
export declare type Link_Props = {
    onClick?: any;
    style?: any;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actionFunc?: ActionFunc<RootState>;
} & React.HTMLProps<HTMLAnchorElement>;
export declare type User = {
    _key?: string;
    displayName: string;
    avatarUrl: string;
};
export declare class Manager {
    Populate(data: Omit<Manager, "Populate" | "store">): void;
    GetStore: () => any;
    get store(): any;
    dbPath: string;
    FormatTime: (time: number, formatStr: string) => string;
    logTypes: LogTypes;
    ShowSignInPopup: () => void;
    GetUserID: () => string;
    GetUser: (id: string) => User;
    GetUserPermissionGroups: (userID: string) => PermissionGroupSet;
    GetNewURLForStoreChanges: (actionFunc: ActionFunc<RootState>) => string;
    MarkdownRenderer: any;
}
export declare const manager: Manager;
export declare let OnPopulated_listeners: any[];
export declare function OnPopulated(listener: () => any): void;
