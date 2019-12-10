import { AssertValidate } from "../Server";
import { GenerateUUID } from "../../Utils/General/KeyGenerator";
import { Command } from "mobx-firelink";
let MTName = "Proposal";
//@UserEdit
export class AddProposal extends Command {
    async Prepare() {
        let { data } = this.payload;
        this.id = GenerateUUID();
        data.creator = this.userInfo.id;
        data.createdAt = Date.now();
        //thread.editedAt = thread.createdAt;
        this.returnData = this.id;
    }
    async Validate() {
        let { data } = this.payload;
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