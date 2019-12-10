import { WaitTillSchemaAddedThenRun, GetSchemaJSON, AddSchema, Schema, AssertValidate } from "../Server";
import { GetAsync, GetDoc, Command } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink";
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
    Validate_Early() {
        AssertValidate(`Update${MTName}_payload`, this.payload, `Payload invalid`);
    }
    async Prepare() {
        let { id, updates } = this.payload;
        //this.oldData = await GetAsync(()=>GetDoc({fire, addHelpers: false}, a=>a.proposals.get(id)));
        //this.oldData = WithoutHelpers(await GetAsync(()=>GetDoc({fire}, a=>a.proposals.get(id))));
        this.oldData = await GetAsync(() => GetDoc({ fire }, a => a.proposals.get(id)));
        this.newData = Object.assign(Object.assign({}, this.oldData), updates);
    }
    async Validate() {
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