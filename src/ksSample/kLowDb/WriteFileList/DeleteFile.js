import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import Configjson from '../../../Config.json' assert { type: 'json' };
import fileNameJson from '../fileName.json' assert { type: 'json' };

let StartFunc = ({ inId }) => {
    let LocalId = inId;
    let UserDataFilePath = `${Configjson.JsonPath}/${fileNameJson.fileName}`;
    const defaultData = { error: "From KLowDb" }


    const db = new LowSync(new JSONFileSync(UserDataFilePath), defaultData);
    db.read();
    let LocalarrayOfObjects = db.data;
    let LocalArrayAfterDelete = deleteObjectById({ inCollection: LocalarrayOfObjects, inId: LocalId });

    db.data = LocalArrayAfterDelete;
    db.write();

    return true;
};

let deleteObjectById = ({ inCollection, inId }) => {
    let LocalCollection = inCollection;
    let LocalId = inId;

    LocalCollection.splice(LocalCollection.findIndex(a => a.UuId === LocalId), 1)

    return LocalCollection;
};


export { StartFunc };
