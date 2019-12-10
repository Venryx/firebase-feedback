import React from "react";
import { Button, CheckBox, Column, Row, Span } from "react-vcomponents";
import { BaseComponent, BaseComponentPlus } from "react-vextensions";
import { ShowMessageBox } from "react-vmessagebox";
import { ScrollView } from "react-vscrollview";
import { IsUserAdmin, IsUserCreatorOrMod } from "../../General";
import { manager } from "../../Manager";
import { DeleteProposal } from "../../Server/Commands/DeleteProposal";
import { UpdateProposal } from "../../Server/Commands/UpdateProposal";
import { GetUpdates } from "../../Utils/Database/DatabaseHelpers";
import { colors } from "../GlobalStyles";
import { ProposalDetailsUI } from "./Proposal/ProposalDetailsUI";
import { store } from "../../Store";
/*@Connect((state, {proposal}: ProposalUI_Props)=> ({
    posts: GetProposalPosts(proposal),
}))*/
export class ProposalUI extends BaseComponent {
    render() {
        let { proposal, subNavBarWidth } = this.props;
        let userID = manager.GetUserID();
        if (proposal == null) {
            return React.createElement("div", { style: ES({ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, fontSize: "25px" }) }, "Loading proposal...");
        }
        //let firstPostWritten = posts.length > 1 || posts[0].text != firstPostPlaceholderText;
        return (React.createElement(Column, { style: ES({ flex: 1 }) },
            React.createElement(ActionBar_Left, { proposal: proposal, subNavBarWidth: subNavBarWidth }),
            React.createElement(ActionBar_Right, { proposal: proposal, subNavBarWidth: subNavBarWidth }),
            React.createElement(ScrollView, { ref: "scrollView", scrollVBarStyle: { width: 10 }, style: ES({ flex: 1 } /*styles.fillParent_abs*/) },
                React.createElement(Column, { style: { width: 960, margin: "50px auto 20px auto", filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)" } },
                    React.createElement(ProposalUI_Inner, { proposal: proposal }),
                    React.createElement(Column, null)))));
    }
}
ProposalUI.defaultProps = { subNavBarWidth: 0 };
export class ProposalUI_Inner extends BaseComponentPlus({}, { editing: false, dataError: null }) {
    render() {
        let { proposal } = this.props;
        const creator = manager.GetUser(proposal.creator);
        let { editing, dataError } = this.state;
        if (editing) {
            return (React.createElement(Column, { sel: true, style: { flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, padding: 10, alignItems: "flex-start", cursor: "auto" } },
                React.createElement(ProposalDetailsUI, { ref: c => this.editorUI = c, baseData: proposal, forNew: false, onChange: (newData, comp) => {
                        this.SetState({ dataError: comp.GetValidationError() });
                    } }),
                React.createElement(Row, { mt: 5 },
                    React.createElement(Button, { text: "Save", enabled: dataError == null, onLeftClick: async () => {
                            let postUpdates = GetUpdates(proposal, this.editorUI.GetNewData());
                            await new UpdateProposal({ id: proposal._key, updates: postUpdates }).Run();
                            this.SetState({ editing: false, dataError: null });
                        } }),
                    React.createElement(Button, { ml: 5, text: "Cancel", onLeftClick: async () => {
                            this.SetState({ editing: false, dataError: null });
                        } }))));
        }
        let creatorOrMod = IsUserCreatorOrMod(manager.GetUserID(), proposal);
        return (React.createElement(Row, { sel: true, style: { flexShrink: 0, background: "rgba(0,0,0,.7)", borderRadius: 10, alignItems: "initial", cursor: "auto" } },
            React.createElement(Column, { p: 10, style: ES({ flex: 1 }) },
                React.createElement(Row, { style: { width: "100%", fontSize: "18px", textAlign: "center" } }, proposal.title),
                React.createElement(Row, { mt: 10, style: { width: "100%" } },
                    React.createElement(manager.MarkdownRenderer, { source: proposal.text })),
                React.createElement(Row, { mt: 5 },
                    React.createElement("span", { style: { color: "rgba(255,255,255,.5)" } },
                        creator ? creator.displayName : "...",
                        ", at ",
                        manager.FormatTime(proposal.createdAt, "YYYY-MM-DD HH:mm:ss")),
                    creatorOrMod &&
                        React.createElement(Button, { ml: 5, text: "Edit", onClick: () => {
                                this.SetState({ editing: true });
                            } }),
                    creatorOrMod &&
                        React.createElement(Button, { ml: 5, text: "Delete", onClick: () => {
                                ShowMessageBox({
                                    title: `Delete proposal`, cancelButton: true,
                                    message: `Delete this proposal?`,
                                    onOK: async () => {
                                        await new DeleteProposal({ id: proposal._key }).Run();
                                    }
                                });
                            } }),
                    proposal.editedAt && React.createElement(Span, { ml: "auto", style: { color: "rgba(255,255,255,.5)" } },
                        proposal.text != null ? "edited" : "deleted",
                        " at ",
                        manager.FormatTime(proposal.editedAt, "YYYY-MM-DD HH:mm:ss")),
                    React.createElement(CheckBox, { ml: "auto", mr: 5, text: "Completed", checked: proposal.completedAt != null, enabled: IsUserAdmin(manager.GetUserID()), onChange: val => {
                            new UpdateProposal({ id: proposal._key, updates: { completedAt: proposal.completedAt == null ? Date.now() : null } }).Run();
                        } })))));
    }
}
class ActionBar_Left extends BaseComponent {
    render() {
        let { proposal, subNavBarWidth } = this.props;
        return (React.createElement("nav", { style: {
                position: "absolute", zIndex: 1, left: 0, width: `calc(50% - ${subNavBarWidth / 2}px)`, top: 0, textAlign: "center",
            } },
            React.createElement(Row, { style: {
                    justifyContent: "flex-start", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
                    width: "100%", height: 30, borderRadius: "0 0 10px 0",
                } },
                React.createElement(Button, { text: "Back", onClick: () => {
                        store.main.proposals.selectedProposalID = null;
                    } }))));
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
        
        let creatorOrMod = IsUserCreatorOrMod(manager.GetUserID(), proposal);
        return (
            <DropDown>
                <DropDownTrigger>
                    <Button ml={5} text="Details"/>
                </DropDownTrigger>
                <DropDownContent style={{left: 0}}>
                    <Column>
                        <ProposalDetailsUI ref={c=>this.detailsUI = c} baseData={proposal}
                            forNew={false} enabled={creatorOrMod}
                            onChange={newData=> {
                                this.SetState({dataError: this.detailsUI.GetValidationError()});
                            }}/>
                        {creatorOrMod &&
                            <Row>
                                <Button mt={5} text="Save" enabled={dataError == null} onLeftClick={async ()=> {
                                    let proposalUpdates = GetUpdates(proposal, this.detailsUI.GetNewData()).Excluding("posts");
                                    await new UpdateProposalDetails({proposalID: proposal._key, proposalUpdates}).Run();
                                }}/>
                            </Row>}
                        {creatorOrMod &&
                            <Column mt={10}>
                                <Row style={{fontWeight: "bold"}}>Advanced:</Row>
                                <Row mt={5}>
                                    <Button text="Delete" enabled={posts.filter(a=>a.creator != manager.GetUserID() && a.text).length <= 1} onLeftClick={async ()=> {
                                        /*let posts = await GetAsync(()=>GetProposalPosts(proposal));
                                        if (posts.length > 1) {
                                            return void ShowMessageBox({title: `Still has posts`,
                                                message: `Cannot delete this proposal until all its posts have been deleted.`});
                                        }*#/

                                        ShowMessageBox({
                                            title: `Delete "${proposal.title}"`, cancelButton: true,
                                            message: `Delete the proposal "${proposal.title}"?`,
                                            onOK: async ()=> {
                                                await new DeleteProposal({proposalID: proposal._key}).Run();
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
class ActionBar_Right extends BaseComponent {
    render() {
        let { proposal, subNavBarWidth } = this.props;
        return (React.createElement("nav", { style: {
                position: "absolute", zIndex: 1, left: `calc(50% + ${subNavBarWidth / 2}px)`, right: 0, top: 0, textAlign: "center",
            } },
            React.createElement(Row, { style: {
                    justifyContent: "flex-end", background: "rgba(0,0,0,.7)", boxShadow: colors.navBarBoxShadow,
                    width: "100%", height: 30, borderRadius: "0 0 0 10px",
                } })));
    }
}
//# sourceMappingURL=ProposalUI.js.map