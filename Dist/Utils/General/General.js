import { runInAction } from "mobx";
export function RunInAction(name, action) {
    Object.defineProperty(action, "name", { value: name });
    return runInAction(action);
}
//# sourceMappingURL=General.js.map