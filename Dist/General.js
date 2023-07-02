import { Assert } from "js-vextensions";
import { manager } from "./Manager.js";
export function RemoveDuplicates(items) {
    var result = [];
    for (let item of items) {
        if (result.indexOf(item) == -1) {
            result.push(item);
        }
    }
    return result;
}
export var emptyArray = [];
export var AccessLevel;
(function (AccessLevel) {
    AccessLevel[AccessLevel["Basic"] = 10] = "Basic";
    AccessLevel[AccessLevel["Verified"] = 20] = "Verified";
    AccessLevel[AccessLevel["Mod"] = 30] = "Mod";
    AccessLevel[AccessLevel["Admin"] = 40] = "Admin";
})(AccessLevel || (AccessLevel = {}));
/*export function GetUserPermissionGroups(userID: string): PermissionGroupSet {
    if (userID == null) return null;
    return GetData("userExtras", userID, "permissionGroups");
}*/
export function GetUserAccessLevel(userID) {
    let groups = manager.GetUserPermissionGroups(userID);
    if (groups == null)
        return AccessLevel.Basic;
    if (groups.admin)
        return AccessLevel.Admin;
    if (groups.mod)
        return AccessLevel.Mod;
    if (groups.verified)
        return AccessLevel.Verified;
    //if (groups.basic) return AccessLevel.Basic;
    Assert(false);
}
export function IsUserBasic(userID) { return (manager.GetUserPermissionGroups(userID) || {}).basic; }
export function IsUserVerified(userID) { return (manager.GetUserPermissionGroups(userID) || {}).verified; }
export function IsUserMod(userID) { return (manager.GetUserPermissionGroups(userID) || {}).mod; }
export function IsUserAdmin(userID) { return (manager.GetUserPermissionGroups(userID) || {}).admin; }
export function IsUserBasicOrAnon(userID) {
    let permissionGroups = manager.GetUserPermissionGroups(userID);
    return permissionGroups == null || permissionGroups.basic;
}
export function IsUserCreatorOrMod(userID, entity) {
    let permissionGroups = manager.GetUserPermissionGroups(userID);
    if (permissionGroups == null)
        return false;
    return (entity.creator == userID && permissionGroups.basic) || permissionGroups.mod;
}
//# sourceMappingURL=General.js.map