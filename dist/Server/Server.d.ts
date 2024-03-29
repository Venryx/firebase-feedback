import Ajv from "ajv";
import { JSONSchema7 } from "json-schema";
export declare const ajv: AJV_Extended;
export declare function Schema(schema: any): any;
export declare const schemaEntryJSONs: Map<string, JSONSchema7>;
export declare function AddSchema(schema: any, name: string): import("ajv/dist/core").default;
export declare function GetSchemaJSON(name: string, errorOnMissing?: boolean): JSONSchema7;
export declare function GetSchemaJSON_Cloned(name: string, errorOnMissing?: boolean): JSONSchema7;
export declare function WaitTillSchemaAddedThenRun(schemaName: string, callback: () => void): void;
export type AJV_Extended = Ajv & {
    FullErrorsText(): string;
};
export declare function AssertValidate(schemaName: string, data: any, failureMessageOrGetter: string | ((errorsText: string) => string), addErrorsText?: boolean, addDataStr?: boolean): void;
