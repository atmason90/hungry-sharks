export default function roomCodeGenerator() {
    var code = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
       code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
}