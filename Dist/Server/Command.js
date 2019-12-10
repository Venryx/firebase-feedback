import { DeepSet, ToJSON, CE } from "js-vextensions";
import { MaybeLog } from "../Utils/General/Logging";
import { manager } from "../Manager";
import { DBPath } from "../Utils/Database/DatabaseHelpers";
export class CommandUserInfo {
}
let currentCommandRun_listeners = null;
async function WaitTillCurrentCommandFinishes() {
    return new Promise((resolve, reject) => {
        currentCommandRun_listeners.push({ resolve, reject });
    });
}
function OnCurrentCommandFinished() {
    let currentCommandRun_listeners_copy = currentCommandRun_listeners;
    currentCommandRun_listeners = null;
    for (let listener of currentCommandRun_listeners_copy) {
        listener.resolve();
    }
}
export class Command {
    constructor(payload) {
        this.userInfo = { id: manager.GetUserID() }; // temp
        this.type = this.constructor.name;
        this.payload = payload;
        //this.Extend(payload);
        //Object.setPrototypeOf(this, Object.getPrototypeOf({}));
    }
    // these methods are executed on the server (well, will be later)
    // ==========
    /** [sync] Validates the payload data. (ie. the validation that doesn't require accessing the database) */
    Validate_Early() { }
    ;
    /** [async] Validates the data, prepares it, and executes it -- thus applying it into the database. */
    async Run() {
        while (currentCommandRun_listeners) {
            await WaitTillCurrentCommandFinishes();
        }
        currentCommandRun_listeners = [];
        MaybeLog(a => a.commands, () => `Running command. @type:${this.constructor.name} @payload(${ToJSON(this.payload)})`);
        try {
            this.Validate_Early();
            await this.Prepare();
            await this.Validate();
            let dbUpdates = this.GetDBUpdates();
            //FixDBUpdates(dbUpdates);
            //await store.firebase.helpers.ref(DBPath("")).update(dbUpdates);
            await manager.ApplyDBUpdates(DBPath(), dbUpdates);
            MaybeLog(a => a.commands, () => `Finishing command. @type:${this.constructor.name} @payload(${ToJSON(this.payload)})`);
        }
        finally {
            OnCurrentCommandFinished();
        }
        // later on (once set up on server), this will send the data back to the client, rather than return it
        return this.returnData;
    }
}
export function MergeDBUpdates(baseUpdatesMap, updatesToMergeMap) {
    let baseUpdates = baseUpdatesMap.Props().map(prop => ({ path: prop.name, data: prop.value }));
    let updatesToMerge = updatesToMergeMap.Props().map(prop => ({ path: prop.name, data: prop.value }));
    for (let update of updatesToMerge) {
        // if an update-to-merge exists for a path, remove any base-updates starting with that path (since the to-merge ones have priority)
        if (update.data == null) {
            for (let update2 of baseUpdates.slice()) { // make copy, since Remove() seems to break iteration otherwise
                if (update2.path.startsWith(update.path)) {
                    CE(baseUpdates).Remove(update2);
                }
            }
        }
    }
    let finalUpdates = [];
    for (let update of baseUpdates) {
        let updatesToMergeIntoThisOne = updatesToMerge.filter(update2 => {
            return update2.path.startsWith(update.path);
        });
        for (let updateToMerge of updatesToMergeIntoThisOne) {
            let updateToMerge_relativePath = updateToMerge.path.substr(`${update.path}/`.length);
            //if (updateToMerge.data) {
            // assume that the update-to-merge has priority, so have it completely overwrite the data at its path
            //update.data = u.updateIn(updateToMerge_relativePath.replace(/\//g, "."), u.constant(updateToMerge.data), update.data);
            DeepSet(update.data, updateToMerge_relativePath, updateToMerge.data);
            /*} else {
                update.data = null;
            }*/
            // remove from updates-to-merge list (since we just merged it)
            CE(updatesToMerge).Remove(updateToMerge);
        }
        finalUpdates.push(update);
    }
    // for any "update to merge" which couldn't be merged into one of the base-updates, just add it as its own update (it won't clash with the others)
    for (let update of updatesToMerge) {
        finalUpdates.push(update);
    }
    let finalUpdatesMap = finalUpdates.reduce((result, current) => CE(result).VSet(current.path, current.data), {});
    return finalUpdatesMap;
}
// template
// ==========
/*
    Validate_Early() {
    }

    async Prepare() {
    }
    async Validate() {
    }

    GetDBUpdates() {
        let updates = {
        };
        return updates;
    }
*/ 
//# sourceMappingURL=Command.js.map