import {WaitTillSchemaAddedThenRun, GetSchemaJSON, AddSchema, Schema, AssertValidate} from "../Server.js";
import {Proposal} from "./../../Store/firebase/proposals/@Proposal.js";
import {GetAsync, GetDoc, Command, AssertV} from "mobx-firelink";
import {fire} from "../../Utils/Database/Firelink.js";
import {GetProposal} from "../../Store/firebase/proposals.js";
import {CE} from "js-vextensions";

type MainType = Proposal;
let MTName = "Proposal";

WaitTillSchemaAddedThenRun(MTName, ()=> {
	AddSchema({
		properties: {
			id: {type: "string"},
			updates: Schema({
				properties: CE(GetSchemaJSON(MTName).properties).IncludeKeys("title", "text", "completedAt"),
			}),
		},
		required: ["id", "updates"],
	}, `Update${MTName}_payload`);
});

//@UserEdit
export class UpdateProposal extends Command<{id: string, updates: Partial<MainType>}> {
	oldData: MainType;
	newData: MainType;
	Validate() {
		AssertValidate(`Update${MTName}_payload`, this.payload, `Payload invalid`);

		let {id, updates} = this.payload;
		this.oldData = GetProposal(id);
		AssertV(this.oldData, "oldData is null");
		this.newData = {...this.oldData, ...updates};
		AssertValidate(MTName, this.newData, `New ${MTName.toLowerCase()}-data invalid`);
	}
	
	GetDBUpdates() {
		let {id} = this.payload;
		let updates = {};
		updates[`proposals/${id}`] = this.newData;
		return updates;
	}
}