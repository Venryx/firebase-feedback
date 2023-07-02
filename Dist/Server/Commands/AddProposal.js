import { AssertValidate } from "../Server.js";
import { GenerateUUID } from "../../Utils/General/KeyGenerator.js";
import { Command } from "mobx-firelink";
let MTName = "Proposal";
//@UserEdit
export class AddProposal extends Command {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    Validate() {
        var _a;
        let { data } = this.payload;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : GenerateUUID();
        data.creator = this.userInfo.id;
        data.createdAt = Date.now();
        //thread.editedAt = thread.createdAt;
        this.returnData = this.id;
        AssertValidate(MTName, data, `${MTName} invalid`);
    }
    GetDBUpdates() {
        let { data } = this.payload;
        let updates = {
            [`proposals/${this.id}`]: data,
        };
        return updates;
    }
}
//# sourceMappingURL=AddProposal.js.map