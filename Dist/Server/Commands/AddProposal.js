import { AssertValidate } from "../Server";
import { GenerateUUID } from "../../Utils/General/KeyGenerator";
import { Command } from "mobx-firelink";
let MTName = "Proposal";
//@UserEdit
export class AddProposal extends Command {
    Validate() {
        var _a;
        let { data } = this.payload;
        this.id = (_a = this.id, (_a !== null && _a !== void 0 ? _a : GenerateUUID()));
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