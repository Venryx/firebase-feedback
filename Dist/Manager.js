import { LogTypes } from "./Utils/General/Logging.js";
import { CE } from "js-vextensions";
export class PermissionGroupSet {
}
export class Manager {
    constructor() {
        this.logTypes = new LogTypes();
        this.actionBarZIndex = 11;
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