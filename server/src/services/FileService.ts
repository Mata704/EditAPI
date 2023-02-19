import fs from "fs"
import path from "path"
import {v4 as uuidv4} from "uuid"

class FileService{
    
    save(file : any) {
        console.log(file)
        const fileExtension = file.mimetype.split('/')[1]
        const fileName =uuidv4()+"."+fileExtension; //só aceita png
        const filepath = path.resolve('static',fileName);
        file.mv(filepath)
        return fileName
    }


}

export  default new FileService();