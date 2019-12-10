import { GetTreeNodesInObjTree, CE } from "js-vextensions";
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
//# sourceMappingURL=DatabaseHelpers.js.map