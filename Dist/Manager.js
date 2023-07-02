import { LogTypes } from "./Utils/General/Logging.js";
import { CE } from "js-vextensions";
export class PermissionGroupSet {
    constructor() {
        Object.defineProperty(this, "basic", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "verified", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "admin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
export class Manager {
    constructor() {
        Object.defineProperty(this, "GetStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /*storePath_mainData: string;
        storePath_dbData: string;*/
        Object.defineProperty(this, "FormatTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new LogTypes()
        });
        Object.defineProperty(this, "ShowSignInPopup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "GetUserID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "GetUser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "GetUserPermissionGroups", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "GetNewURLForStoreChanges", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "MarkdownRenderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); //(...props: any[])=>JSX.Element;
        Object.defineProperty(this, "actionBarZIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 11
        });
    }
    Populate(data) {
        CE(this).Extend(data);
        OnPopulated_listeners.forEach(a => a());
    }
    get store() { return this.GetStore(); }
}
export const manager = new Manager();
export let OnPopulated_listeners = [];
export function OnPopulated(listener) { OnPopulated_listeners.push(listener); }
//# sourceMappingURL=Manager.js.map