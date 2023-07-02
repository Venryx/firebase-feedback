import { AddSchema } from "../../../Server/Server.js";
import { CE } from "js-vextensions";
export class Proposal {
    constructor(initialData) {
        Object.defineProperty(this, "_key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        //completed: boolean;
        Object.defineProperty(this, "creator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "createdAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "editedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "completedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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