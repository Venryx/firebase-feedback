import { CE } from "js-vextensions";
export class DroppableInfo {
    constructor(data) {
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // if ProposalsColumn
        //proposalType: "feature" | "issue";
        Object.defineProperty(this, "proposalType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // if ProposalsUserRankingColumn
        Object.defineProperty(this, "userID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        CE(this).Extend(data);
    }
}
export class DraggableInfo {
    constructor(data) {
        // if in ProposalsColumn or ProposalsUserRankingColumn
        Object.defineProperty(this, "columnType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "proposalID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        CE(this).Extend(data);
    }
}
//# sourceMappingURL=DNDStructures.js.map