import { WaitTillSchemaAddedThenRun, GetSchemaJSON, AddSchema, Schema, AssertValidate } from "../Server.js";
import { Command, AssertV } from "mobx-firelink";
import { GetProposal } from "../../Store/firebase/proposals.js";
import { CE } from "js-vextensions";
let MTName = "Proposal";
WaitTillSchemaAddedThenRun(MTName, () => {
    AddSchema({
        properties: {
            id: { type: "string" },
            updates: Schema({
                properties: CE(GetSchemaJSON(MTName).properties).IncludeKeys("title", "text", "completedAt"),
            }),
        },
        required: ["id", "updates"],
    }, `Update${MTName}_payload`);
});
//@UserEdit
export class UpdateProposal extends Command {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "oldData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "newData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
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