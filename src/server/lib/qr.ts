import * as QrCode from 'qrcode';
export const QrGenerator = (token:string):Promise<{}> => {
    return QrCode.toDataURL(token);
}

export const QrDecoder = () => {

}