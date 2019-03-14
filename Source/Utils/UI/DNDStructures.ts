export class DroppableInfo {
	constructor(data: Partial<DroppableInfo>) {
		this.Extend(data);
	}
	type: "ProposalsColumn" | "ProposalsUserRankingColumn";
	
	// if ProposalsColumn
	//proposalType: "feature" | "issue";
	proposalType: string;

	// if ProposalsUserRankingColumn
	userID?: string;
}
export class DraggableInfo {
	constructor(data: Partial<DraggableInfo>) {
		this.Extend(data);
	}

	// if in ProposalsColumn or ProposalsUserRankingColumn
	columnType?: string;
	proposalID?: string;
}