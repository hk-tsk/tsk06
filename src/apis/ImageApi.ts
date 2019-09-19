import { ApiException } from './ApiException';
import BaseApi from './BaseApi';

// interface IImageStore {
//     Name: string,
//     Category: string,
//     Data: string,
// }
class ImageApi extends BaseApi {
    // private ImageStore: IImageStore[] = [];

    public GetImageUrl(name: string, category: string = "shared") {
        return this.baseUrl + "Images/" + category + "/" + name;
    }

    public async GetImages(name: string, category: string = "shared") {

        // let item = this.ImageStore.find(c => c.Category === category && c.Name === name);

        // if (item === undefined) {
        const response = await this.get("Images/" + category + "/" + name, { responseType: 'arraybuffer' });
        if (response instanceof ApiException) {
            return response
        } else {
            const minetype = this.GetImageMimeTypeFromImageFileExtension(name.split(".")[1].toLowerCase());

            const image = btoa(new Uint8Array(response.data).reduce((data, byte) =>
                data + String.fromCharCode(byte), ''));

            const item = {
                Name: name,
                // tslint:disable-next-line: object-literal-sort-keys
                Category: category,
                Data: 'data:' + minetype + ';base64,' + image,
            };

            //         this.ImageStore.push(item);
            //     }
            // }
            return item.Data;
        }
    }

    private GetImageMimeTypeFromImageFileExtension(extension: string) {
        let mimetype: string;

        switch (extension) {
            case "png":
                mimetype = "image/png";
                break;
            case "gif":
                mimetype = "image/gif";
                break;
            case "jpg":
            case "jpeg":
                mimetype = "image/jpeg";
                break;
            case "bmp":
                mimetype = "image/bmp";
                break;
            case "tiff":
                mimetype = "image/tiff";
                break;
            case "wmf":
                mimetype = "image/wmf";
                break;
            case "jp2":
                mimetype = "image/jp2";
                break;
            case "svg":
                mimetype = "image/svg+xml";
                break;
            default:
                mimetype = "application/octet-stream";
                break;
        }

        return mimetype;
    }

}

export const imageManagment = new ImageApi();