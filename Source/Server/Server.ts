import Ajv from "ajv";
import AJV from "ajv";
import AJVKeywords from "ajv-keywords";
import {IsString, ToJSON, Assert, E, Clone} from "js-vextensions";
import {JSONSchema7} from "json-schema";

export const ajv = AJVKeywords(new AJV()) as AJV_Extended;

export function Schema(schema) {
	schema = E({additionalProperties: false}, schema);
	return schema;
}

//let schemaEntryJSONs = {};
export const schemaEntryJSONs = new Map<string, JSONSchema7>();
export function AddSchema(schema, name: string) {
	schema = Schema(schema);
	schemaEntryJSONs.set(name, schema);
	ajv.removeSchema(name); // for hot-reloading
	let result = ajv.addSchema(schema, name);
	Assert(GetSchemaJSON(name), `Failed to add schema "${name}".`);

	if (schemaAddListeners[name]) {
		for (let listener of schemaAddListeners[name]) {
			listener();
		}
		delete schemaAddListeners[name];
	}

	return result;
}

export function GetSchemaJSON(name: string, errorOnMissing = true): JSONSchema7 {
	const schemaJSON = schemaEntryJSONs.get(name);
	Assert(schemaJSON != null || !errorOnMissing, `Could not find schema "${name}".`);
	//return Clone(schemaJSON);
	return schemaJSON!;
}
export function GetSchemaJSON_Cloned(name: string, errorOnMissing = true): JSONSchema7 {
	return Clone(GetSchemaJSON(name, errorOnMissing));
}

var schemaAddListeners = {};
export function WaitTillSchemaAddedThenRun(schemaName: string, callback: ()=>void) {
	// if schema is already added, run right away
	if (ajv.getSchema(schemaName)) {
		callback();
		return;
	}
	schemaAddListeners[schemaName] = (schemaAddListeners[schemaName] || []).concat(callback);
}

export type AJV_Extended = Ajv & {
	//AddSchema(schema, name: string): void;
	FullErrorsText(): string;
};
/*AJV.prototype.AddSchema = function(this: AJV_Extended, schema, name: string) {
	return `${this.errorsText()} (${ToJSON(this.errors)})`;
};*/
Ajv.prototype["FullErrorsText"] = function(this: AJV_Extended) {
	return `${this.errorsText()}

Details: ${ToJSON(this.errors, null, 3)}
`;
};

// validation
// ==========

export function AssertValidate(schemaName: string, data, failureMessageOrGetter: string | ((errorsText: string)=>string), addErrorsText = true, addDataStr = true) {
	let validationResult = ajv.validate(schemaName, data);
	if (validationResult == true) return;

	let errorsText = ajv.FullErrorsText();
	let failureMessage = IsString(failureMessageOrGetter) ? failureMessageOrGetter : failureMessageOrGetter(errorsText);
	if (addErrorsText) {
		failureMessage += `: ${errorsText}`;
	}
	if (addDataStr) {
		failureMessage += `\nData: ${ToJSON(data, null, 3)}`;
	}
	failureMessage += "\n";

	Assert(validationResult, failureMessage);
}