import React from "react";
import {BaseComponent, FindDOM, GetInnerComp} from "react-vextensions";
import {Pre} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {TextInput} from "react-vcomponents";
import {Select} from "react-vcomponents";
import {RowLR} from "react-vcomponents";
import {CheckBox} from "react-vcomponents";
import {ScrollView} from "react-vscrollview";
import {Button} from "react-vcomponents";
import {Spinner} from "react-vcomponents";
import {Proposal} from "../../../Store/firebase/feedback/@Proposal";
import {MarkdownToolbar} from "../../@Shared/MarkdownToolbar";
import {Link} from "../../@Shared/Link";
import Editor from "react-md-editor";
import { GetErrorMessagesUnderElement } from "js-vextensions";
import {ShowMessageBox, BoxController} from "react-vmessagebox";
import {ACTProposalSelect} from "../../../Store/feedback";
import {AddProposal} from "../../../Server/Commands/AddProposal";

export type _MainType = Proposal;
let MTName = "Proposal";

export type ProposalDetailsUI_Props = {baseData: _MainType, forNew: boolean, enabled?: boolean, style?, onChange?: (newData: _MainType, comp: ProposalDetailsUI)=>void}
	& Partial<{creator: User}>;
export class ProposalDetailsUI extends BaseComponent<ProposalDetailsUI_Props, {newData: _MainType}> {
	static defaultProps = {enabled: true};
	ComponentWillMountOrReceiveProps(props, forMount) {
		if (forMount || props.baseData != this.props.baseData) { // if base-data changed
			this.SetState({newData: Clone(props.baseData)});
		}
	}

	render() {
		let {forNew, enabled, style, onChange, creator} = this.props;
		let {newData} = this.state;
		let Change = _=> {
			if (onChange)
				onChange(this.GetNewData(), this);
			this.Update();
		};

		let splitAt = 170, width = 600;
		return (
			<div> {/* needed so GetInnerComp() works */}
			<Column style={style}>
				<RowLR mt={5} splitAt={splitAt} style={{width}}>
					<Pre>Title: </Pre>
					<TextInput required
						enabled={enabled} style={{width: "100%"}}
						value={newData.title} onChange={val=>Change(newData.title = val)}/>
				</RowLR>
				<Row mt={5}>Text:</Row>
				<Row mt={5} /*splitAt={splitAt} style={{width}}*/>
					<Column style={{width: "100%"}}>
						{enabled &&
							<MarkdownToolbar editor={()=>this.refs.editor}>
								<Link to="https://guides.github.com/features/mastering-markdown" style={{marginLeft: 10}}>How to add links, images, etc.</Link>
							</MarkdownToolbar>}
						<Editor ref="editor" value={newData.text || ""} onChange={val=>Change(newData.text = val)}
							options={E({
								scrollbarStyle: "overlay",
								lineWrapping: true,
								readOnly: !enabled,
								placeholder: "Write your reply..."
							}, /*options*/)}/>
					</Column>
				</Row>
			</Column>
			</div>
		);
	}
	GetValidationError() {
		return GetErrorMessagesUnderElement(FindDOM(this))[0];
	}

	GetNewData() {
		let {newData} = this.state;
		return Clone(newData) as _MainType;
	}
}

export function ShowAddProposalDialog(userID: string) {
	let newEntry = new Proposal({
	});
	
	let detailsUI: ProposalDetailsUI;
	let error = null;
	let Change = (..._)=>boxController.UpdateUI();
	let boxController: BoxController = ShowMessageBox({
		title: `Add proposal`, cancelButton: true,
		messageUI: ()=> {
			boxController.options.okButtonClickable = error == null;
			return (
				<Column style={{padding: `10px 0`, width: 600}}>
					<ProposalDetailsUI ref={c=>detailsUI = GetInnerComp(c) as any} baseData={newEntry} forNew={true}
						onChange={val=>Change(newEntry = val, error = detailsUI.GetValidationError())}/>
					{error && error != "Please fill out this field." && <Row mt={5} style={{color: "rgba(200,70,70,1)"}}>{error}</Row>}
				</Column>
			);
		},
		onOK: async ()=> {
			let id = await new AddProposal({data: newEntry}).Run() as number;
			store.dispatch(new ACTProposalSelect({id}));
		}
	});
}