import {BaseComponent, GetInnerComp} from "react-vextensions";
import {Row, Pre} from "react-vcomponents";
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
import {Proposal} from "../../Store/firebase/feedback/@Proposal";
import {ACTProposalSelect} from "../../Store/feedback";

export type ProposalUI_Props = {proposal: Proposal, subNavBarWidth?: number} & Partial<{/*permissions: PermissionGroupSet, posts: Post[]*/}>;
/*@Connect((state, {proposal}: ProposalUI_Props)=> ({
	posts: GetProposalPosts(proposal),
}))*/
export class ProposalUI extends BaseComponent<ProposalUI_Props, {}> {
	static defaultProps = {subNavBarWidth: 0};
	render() {
		let {proposal} = this.props;
		let userID = Manager.GetUserID();
		
		if (proposal == null) {
			return <div style={{display: "flex", alignItems: "center", justifyContent: "center", flex: 1, fontSize: 25}}>Loading proposal...</div>;
		}

		//let firstPostWritten = posts.length > 1 || posts[0].text != firstPostPlaceholderText;

		return (
			<Column style={{flex: 1}}>
				<ActionBar_Left proposal={proposal}/>
				<ActionBar_Right proposal={proposal}/>
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={{flex: 1}/*styles.fillParent_abs*/}>
					<Column style={{width: 960, margin: "50px auto 20px auto", filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
						{/*<Column className="clickThrough" style={{height: 80, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
							<Row style={{height: 40, padding: 10}}>
								<Button text="Add proposal" ml="auto" onClick={()=> {
									if (userID == null) return Manager.ShowSignInPopup();
									ShowAddProposalDialog(userID, proposal._id);
								}}/>
							</Row>
						</Column>*/}
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

/*class ReplyBox extends BaseComponent<{proposal: Proposal}, {dataError: string}> {
	postEditorUI: PostEditorUI;
	newPost: Post;
	render() {
		let {proposal} = this.props;
		let {dataError} = this.state;
		this.newPost = this.newPost || new Post({});
		return (
			<Column sel mt={20} style={{background: "rgba(0,0,0,.7)", borderRadius: 10, padding: 10, alignItems: "flex-start", cursor: "auto"}}>
				<PostEditorUI ref={c=>this.postEditorUI = GetInnerComp(c) as any} baseData={this.newPost} forNew={true}
					onChange={(newData, comp)=> {
						this.newPost = newData;
						this.SetState({dataError: comp.GetValidationError()});
					}}/>
				<Row mt={5}>
					<Button text="Post reply" enabled={dataError == null} onLeftClick={async ()=> {
						if (Manager.GetUserID() == null) return Manager.ShowSignInPopup();
						
						let post = this.postEditorUI.GetNewData();
						await new AddPost({proposalID: proposal._id, post: post}).Run();
						this.newPost = null;
					}}/>
					{/*error && <Pre>{error.message}</Pre>*#/}
				</Row>
			</Column>
		)
	}
}*/

type ActionBar_LeftProps = {proposal: Proposal};
class ActionBar_Left extends BaseComponent<ActionBar_LeftProps, {}> {
	render() {
		let {proposal} = this.props;

		return (
			<nav style={{
				position: "absolute", zIndex: 1, left: 0, width: "50%", top: 0, textAlign: "center",
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

class ActionBar_Right extends BaseComponent<{proposal: Proposal}, {}> {
	render() {
		let {proposal} = this.props;
		return (
			<nav style={{
				position: "absolute", zIndex: 1, left: "50%", right: 0, top: 0, textAlign: "center",
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