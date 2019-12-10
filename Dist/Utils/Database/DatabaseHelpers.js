var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Assert, GetTreeNodesInObjTree, E, IsString, CE } from "js-vextensions";
import { manager } from "../../index";
import { SplitStringBySlash_Cached } from "./StringSplitCache";
//export {DBPath};
export function DBPath(path = "", inVersionRoot = true) {
    Assert(path != null, "Path cannot be null.");
    Assert(IsString(path), "Path must be a string.");
    /*let versionPrefix = path.match(/^v[0-9]+/);
    if (versionPrefix == null) // if no version prefix already, add one (referencing the current version)*/
    if (inVersionRoot) {
        path = `${manager.storePath_dbData}${path ? `/${path}` : ""}`;
    }
    return path;
}
export function DBPathSegments(pathSegments, inVersionRoot = true) {
    let result = pathSegments;
    if (inVersionRoot) {
        result = manager.storePath_dbData.split("/").concat(result);
    }
    return result;
}
export function SlicePath(path, removeFromEndCount, ...itemsToAdd) {
    //let parts = path.split("/");
    let parts = SplitStringBySlash_Cached(path).slice();
    parts.splice(parts.length - removeFromEndCount, removeFromEndCount, ...itemsToAdd);
    return parts.join("/");
}
let helperProps = ["_key", "_id"];
/** Note: this mutates the original object. */
export function RemoveHelpers(data) {
    var treeNodes = GetTreeNodesInObjTree(data, true);
    for (let treeNode of treeNodes) {
        if (CE(helperProps).Contains(treeNode.prop))
            delete treeNode.obj[treeNode.prop];
    }
    return data;
}
export function GetUpdates(oldData, newData, useNullInsteadOfUndefined = true) {
    let result = {};
    for (let key of oldData.VKeys(true).concat(newData.VKeys(true))) {
        if (newData[key] !== oldData[key]) {
            result[key] = newData[key];
            if (newData[key] === undefined && useNullInsteadOfUndefined) {
                result[key] = null;
            }
        }
    }
    return RemoveHelpers(result);
}
export class GetData_Options {
    constructor() {
        this.makeRequest = true;
        this.collection = false;
        this.useUndefinedForInProgress = false;
    }
}
export function GetData(...args) {
    let pathSegments, options;
    if (typeof args[0] == "string")
        pathSegments = args;
    else
        [options, ...pathSegments] = args;
    options = E(new GetData_Options(), options);
    return manager.GetData(options, ...manager.storePath_dbData.split("/").concat(pathSegments));
}
export class GetDataAsync_Options {
    constructor() {
        this.collection = false;
        this.addHelpers = true;
    }
}
export function GetDataAsync(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        let pathSegments, options;
        if (typeof args[0] == "string")
            pathSegments = args;
        else
            [options, ...pathSegments] = args;
        options = E(new GetDataAsync_Options(), options);
        return manager.GetDataAsync(options, ...manager.storePath_dbData.split("/").concat(pathSegments));
    });
}
export function GetAsync(dbGetterFunc, statsLogger) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield manager.GetAsync(dbGetterFunc, statsLogger);
    });
}
//# sourceMappingURL=DatabaseHelpers.js.map