var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    Prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, updates } = this.payload;
            //this.oldData = await GetAsync(()=>GetDoc({fire, addHelpers: false}, a=>a.proposals.get(id)));
            //this.oldData = WithoutHelpers(await GetAsync(()=>GetDoc({fire}, a=>a.proposals.get(id))));
            this.oldData = yield GetAsync(() => GetDoc({ fire }, a => a.proposals.get(id)));
            this.newData = Object.assign(Object.assign({}, this.oldData), updates);
        });
    }
    Validate() {
        return __awaiter(this, void 0, void 0, function* () {
            AssertValidate(MTName, this.newData, `New ${MTName.toLowerCase()}-data invalid`);
        });
    }
    GetDBUpdates() {
        let { id } = this.payload;
        let updates = {};
        updates[`proposals/${id}`] = this.newData;
        return updates;
    }
}
//# sourceMappingURL=UpdateProposal.js.map