import { AddSchema } from "../../../Server/Server.js";
import { CE } from "js-vextensions";
export class Proposal {
    constructor(initialData) {
        this.title = "";
        this.text = "";
        CE(this).Extend(initialData);
    }
}
AddSchema({
    properties: {
        type: { type: "string" },
        title: { type: "string" },
        text: { type: "string" },
        //completed: {type: ["null", "boolean"]},
        creator: { type: "string" },
        createdAt: { type: "number" },
        editedAt: { type: "number" },
        completedAt: { type: ["null", "number"] },
    },
    required: ["type", "title", "text", "creator", "createdAt"],
}, "Proposal");
//# sourceMappingURL=@Proposal.js.map