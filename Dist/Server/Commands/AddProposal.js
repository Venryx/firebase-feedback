var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "../Command";
import { AssertValidate } from "../Server";
import { GenerateUUID } from "../../Utils/General/KeyGenerator";
let MTName = "Proposal";
//@UserEdit
export class AddProposal extends Command {
    Prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = this.payload;
            this.id = GenerateUUID();
            data.creator = this.userInfo.id;
            data.createdAt = Date.now();
            //thread.editedAt = thread.createdAt;
            this.returnData = this.id;
        });
    }
    Validate() {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = this.payload;
            AssertValidate(MTName, data, `${MTName} invalid`);
        });
    }
    GetDBUpdates() {
        let { data } = this.payload;
        let updates = {
            [`proposals/${this.id}`]: data,
        };
        return updates;
    }
}
//# sourceMappingURL=AddProposal.js.map