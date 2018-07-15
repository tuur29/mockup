
import { v4 as uuid } from 'uuid';

export class Artboard {

    id: string;
    name: string;
    object: any; // type is fabric.Canvas
    data?: any; // json output from fabric

    constructor(id?:string, name?: string, data?: any) {
        if (id) this.id = id;
        else this.id = uuid();

        // TODO: gracefully increment artboard default name?
        if (name) this.name = name;
        else this.name = "Artboard " + this.id.substr(0,5);

        if (data) this.data = data;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            data: this.object.toJSON()
        };
    }

    static fromJSON(json: any) {
        return new Artboard(json.id, json.name, json.data);
    }

}
