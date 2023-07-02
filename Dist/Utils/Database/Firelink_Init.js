import { fire } from "./Firelink.js"; // this import must come first!
//import {firelink_instance_internal_do_not_import} from "./Firelink_Instance.js"; // this import must come first!
import { OnPopulated, manager } from "../../Manager.js";
import { store } from "../../Store/index.js";
//console.log("TestC.1");
OnPopulated(() => {
    //console.log("TestC.2");
    store.firelink = fire;
    // now that manager.dbPath is populated, we can initialize the Firelink
    fire.Initialize({
        rootPathInDB: manager.dbPath,
        rootStore: store,
    });
});
//# sourceMappingURL=Firelink_Init.js.map