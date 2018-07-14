
import { v4 as uuid } from 'uuid';

export class Artboard {

    id: string;
    object: any; // type is fabric.Canvas
    data?: any; // json output from fabric

    constructor(id?:string, data?: any) {
        if (id) this.id = id;
        else this.id = uuid();

        if (data) this.data = data;
    }

    toJSON() {
        return {
            id: this.id,
            data: this.object.toJSON()
        };
    }

}