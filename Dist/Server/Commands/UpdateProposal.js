import { WaitTillSchemaAddedThenRun, GetSchemaJSON, AddSchema, Schema, AssertValidate } from "../Server.js";
import { Command, AssertV } from "mobx-firelink";
import { GetProposal } from "../../Store/firebase/proposals.js";
let MTName = "Proposal";
WaitTillSchemaAddedThenRun(MTName, () => {
    AddSchema({
        properties: {
            id: { type: "string" },
            updates: Schema({
                properties: GetSchemaJSON(MTName).properties.Including("title", "text", "completedAt"),
            }),
        },
        required: ["id", "updates"],
    }, `Update${MTName}_payload`);
});
//@UserEdit
export class UpdateProposal extends Command {
    Validate() {
        AssertValidate(`Update${MTName}_payload`, this.payload, `Payload invalid`);
        let { id, updates } = this.payload;
        this.oldData = GetProposal(id);
        AssertV(this.oldData, "oldData is null");
        this.newData = Object.assign(Object.assign({}, this.oldData), updates);
        AssertValidate(MTName, this.newData, `New ${MTName.toLowerCase()}-data invalid`);
    }
    GetDBUpdates() {
        let { id } = this.payload;
        let updates = {};
        updates[`proposals/${id}`] = this.newData;
        return updates;
    }
}
//# sourceMappingURL=UpdateProposal.js.map