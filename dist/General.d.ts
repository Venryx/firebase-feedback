import { Proposal } from "./index";
export declare function RemoveDuplicates(items: any): any[];
export declare var emptyArray: any[];
export declare enum AccessLevel {
    Basic = 10,
    Verified = 20,
    Mod = 30,
    Admin = 40
}
export declare function GetUserAccessLevel(userID: string): AccessLevel;
export declare function IsUserBasic(userID: string): any;
export declare function IsUserVerified(userID: string): any;
export declare function IsUserMod(userID: string): any;
export declare function IsUserAdmin(userID: string): any;
export declare function IsUserBasicOrAnon(userID: string): boolean;
export declare function IsUserCreatorOrMod(userID: string, entity: Proposal): boolean;
