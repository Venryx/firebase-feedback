import {BaseComponent, GetInnerComp} from "react-vextensions";
import {Row, Pre, Div, Span} from "react-vcomponents";
import {Button} from "react-vcomponents";
import {DropDown} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {ScrollView} from "react-vscrollview";
import {Spinner, DropDownTrigger, DropDownContent} from "react-vcomponents";
import React from "react";
import {Connect} from "../../Utils/Database/FirebaseConnect";
import {Manager, PermissionGroupSet} from "../../Manager";
import {colors} from "../GlobalStyles";
import {IsUserCreatorOrMod} from "../../General";
import {GetUpdates} from "../../Utils/Database/DatabaseHelpers";
import {Proposal} from "./../../Store/firebase/proposals/@Proposal";
import {ShowMessageBox} from "react-vmessagebox";
import {DeleteProposal} from "../../Server/Commands/DeleteProposal";
import {ProposalDetailsUI} from "./Proposal/ProposalDetailsUI";
import {UpdateProposal} from "../../Server/Commands/UpdateProposal";
import {ACTProposalSelect} from "../../Store/main";

export type ProposalUI_Props = {proposal: Proposal, subNavBarWidth?: number} & Partial<{/*permissions: PermissionGroupSet, posts: Post[]*/}>;
/*@Connect((state, {proposal}: ProposalUI_Props)=> ({
	posts: GetProposalPosts(proposal),
}))*/
export class ProposalUI extends BaseComponent<ProposalUI_Props, {}> {
	static defaultProps = {subNavBarWidth: 0};
	render() {
		let {proposal, subNavBarWidth} = this.props;
		let userID = Manager.GetUserID();
		
		if (proposal == null) {
			return <div style={{display: "flex", alignItems: "center", justifyContent: "center", flex: 1, fontSize: 25}}>Loading proposal...</div>;
		}

		//let firstPostWritten = posts.length > 1 || posts[0].text != firstPostPlaceholderText;

		return (
			<Column style={{flex: 1}}>
				<ActionBar_Left proposal={proposal} subNavBarWidth={subNavBarWidth}/>
				<ActionBar_Right proposal={proposal} subNavBarWidth={subNavBarWidth}/>
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={{flex: 1}/*styles.fillParent_abs*/}>
					<Column style={{width: 960, margin: "50px auto 20px auto", filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
						<ProposalUI_Inner proposal={proposal}/>
						<Column>
							{/*posts.map((post, index)=> {
								return <PostUI key={index} index={index} proposal={proposal} post={post}/>;
							})}
							{firstPostWritten &&
								<ReplyBox proposal={proposal}/>*/}
						</Column>
					</Column>
				</ScrollView>
			</Column>
		);
	}
}

type ProposalUI_Inner_Props = {proposal: Proposal} & Partial<{creator: User}>;
@Connect((state, {proposal}: ProposalUI_Inner_Props)=> ({
	creator: Manager.GetUser(proposal.creator),
}))
class ProposalUI_Inner extends BaseComponent<ProposalUI_Inner_Props, {editing: boolean, dataError: string}> {
	editorUI: ProposalDetailsUI;
	render() {
		let {proposal, creator} = this.props;
		let {editing, dataError} = this.state;

		if (editing) {
			return (
				<Column sel style={{flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, padding: 10, alignItems: "flex-start", cursor: "auto"}}>
					<ProposalDetailsUI ref={c=>this.editorUI = GetInnerComp(c) as any} baseData={proposal} forNew={false}
						onChange={(newData, comp)=> {
							this.SetState({dataError: comp.GetValidationError()});
						}}/>
					<Row mt={5}>
						<Button text="Save" enabled={dataError == null} onLeftClick={async ()=> {
							let postUpdates = GetUpdates(proposal, this.editorUI.GetNewData());
							await new UpdateProposal({id: proposal._id, updates: postUpdates}).Run();
							this.SetState({editing: false, dataError: null});
						}}/>
						<Button ml={5} text="Cancel" onLeftClick={async ()=> {
							this.SetState({editing: false, dataError: null});
						}}/>
					</Row>
				</Column>
			)
		}

		let creatorOrMod = IsUserCreatorOrMod(Manager.GetUserID(), proposal);
		return (
			<Column className="clickThrough" style={{height: 80, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
				<Row sel style={{flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, alignItems: "initial", cursor: "auto"}}>
					<Column p={10} style={{flex: 1}}>
						<Row style={{width: "100%", fontSize: "18", textAlign: "center"}}>
							{proposal.title}
						</Row>
						<Row style={{width: "100%"}}>
							<Manager.MarkdownRenderer source={proposal.text}/>
						</Row>
						<Row mt="auto">
							<span style={{color: "rgba(255,255,255,.5)"}}>{creator ? creator.displayName : "..."}, at {Manager.FormatTime(proposal.createdAt, "YYYY-MM-DD HH:mm:ss")}</span>
							{creatorOrMod &&
								<Button ml={5} text="Edit" onClick={()=> {
									this.SetState({editing: true});
								}}/>}
							{creatorOrMod &&
								<Button ml={5} text="Delete" onClick={()=> {
									ShowMessageBox({
										title: `Delete proposal`, cancelButton: true,
										message: `Delete this proposal?`,
										onOK: async ()=> {
											await new DeleteProposal({id: proposal._id}).Run();
										}
									});
								}}/>}
							{proposal.editedAt && <Span ml="auto" style={{color: "rgba(255,255,255,.5)"}}>
								{proposal.text != null ? "edited" : "deleted"} at {Manager.FormatTime(proposal.editedAt, "YYYY-MM-DD HH:mm:ss")}
							</Span>}
						</Row>
					</Column>
				</Row>
			</Column>
		);
	}
}

type ActionBar_LeftProps = {proposal: Proposal, subNavBarWidth: number};
class ActionBar_Left extends BaseComponent<ActionBar_LeftProps, {}> {
	render() {
		let {proposal, subNavBarWidth} = this.props;

		return (
			<nav style={{
				position: "absolute", zIndex: 1, left: 0, width: `calc(50% - ${subNavBarWidth / 2}px)`, top: 0, textAlign: "center",
				//background: "rgba(0,0,0,.5)", boxShadow: "3px 3px 7px rgba(0,0,0,.07)",
			}}>
				<Row style={{
					justifyContent: "flex-start", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
					width: "100%", height: 30, borderRadius: "0 0 10px 0",
				}}>
					<Button text="Back" onClick={()=> {
						store.dispatch(new ACTProposalSelect({id: null}));
					}}/>
					{/*<DetailsDropdown proposal={proposal}/>*/}
				</Row>
			</nav>
		);
	}
}

/*type DetailsDropdownProps = {proposal: Proposal} & Partial<{posts: Post[]}>;
@Connect((state, {proposal}: DetailsDropdownProps)=> ({
	posts: GetProposalPosts(proposal),
}))
class DetailsDropdown extends BaseComponent<DetailsDropdownProps, {dataError: string}> {
	detailsUI: ProposalDetailsUI;
	render() {
		let {proposal, posts} = this.props;
		let {dataError} = this.state;
		
		let creatorOrMod = IsUserCreatorOrMod(Manager.GetUserID(), proposal);
		return (
			<DropDown>
				<DropDownTrigger>
					<Button ml={5} text="Details"/>
				</DropDownTrigger>
				<DropDownContent style={{left: 0}}>
					<Column>
						<ProposalDetailsUI ref={c=>this.detailsUI = GetInnerComp(c) as any} baseData={proposal}
							forNew={false} enabled={creatorOrMod}
							onChange={newData=> {
								this.SetState({dataError: this.detailsUI.GetValidationError()});
							}}/>
						{creatorOrMod &&
							<Row>
								<Button mt={5} text="Save" enabled={dataError == null} onLeftClick={async ()=> {
									let proposalUpdates = GetUpdates(proposal, this.detailsUI.GetNewData()).Excluding("posts");
									await new UpdateProposalDetails({proposalID: proposal._id, proposalUpdates}).Run();
								}}/>
							</Row>}
						{creatorOrMod &&
							<Column mt={10}>
								<Row style={{fontWeight: "bold"}}>Advanced:</Row>
								<Row mt={5}>
									<Button text="Delete" enabled={posts.filter(a=>a.creator != Manager.GetUserID() && a.text).length <= 1} onLeftClick={async ()=> {
										/*let posts = await GetAsync(()=>GetProposalPosts(proposal));
										if (posts.length > 1) {
											return void ShowMessageBox({title: `Still has posts`,
												message: `Cannot delete this proposal until all its posts have been deleted.`});
										}*#/

										ShowMessageBox({
											title: `Delete "${proposal.title}"`, cancelButton: true,
											message: `Delete the proposal "${proposal.title}"?`,
											onOK: async ()=> {
												await new DeleteProposal({proposalID: proposal._id}).Run();
												store.dispatch(new ACTProposalSelect({id: null}));
											}
										});
									}}/>
									<Pre ml={10} style={{opacity: .7}}>(note: proposals with responses by others cannot be deleted)</Pre>
								</Row>
							</Column>}
					</Column>
				</DropDownContent>
			</DropDown>
		)
	}
}*/

class ActionBar_Right extends BaseComponent<{proposal: Proposal, subNavBarWidth: number}, {}> {
	render() {
		let {proposal, subNavBarWidth} = this.props;
		return (
			<nav style={{
				position: "absolute", zIndex: 1, left: `calc(50% + ${subNavBarWidth / 2}px)`, right: 0, top: 0, textAlign: "center",
				//background: "rgba(0,0,0,.5)", boxShadow: "3px 3px 7px rgba(0,0,0,.07)",
			}}>
				<Row style={{
					justifyContent: "flex-end", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
					width: "100%", height: 30, borderRadius: "0 0 0 10px",
				}}>
					{/*<DropDown>
						<DropDownTrigger>
							<Button text="Layout"/>
						</DropDownTrigger>
						<DropDownContent style={{right: 0}}>
							<Column>
								<Row>
									<Pre>Initial child limit: </Pre>
									<Spinner min={1} value={initialChildLimit} onChange={val=>store.dispatch(new ACTSetInitialChildLimit({value: val}))}/>
								</Row>
							</Column>
						</DropDownContent>
					</DropDown>*/}
				</Row>
			</nav>
		);
	}
}