function getRoomByAccessToken(access_token) {
    try {
        /**
         * category**
         * a: forever
         * b: 1 year
         * c: 6 months
         * d: 3 months
         * e: 1 month
         * f: 1 week
         * g: 2 year
         * h: 3 year
         * i: 5 year
         * z: forever with update permission
         */
        const token_arr = access_token.split('-');
        token_permission = token_arr[1];
        let room_name = 'romio';
        switch (token_permission) {
            case 'a':
                room_name = 'eater';
                break;
            case 'b':
                room_name = 'eater';
                break;
            case 'c':
                room_name = 'eater';
                break;
            case 'd':
                room_name = 'eater';
                break;
            case 'e':
                room_name = 'eater';
                break;
            case 'f':
                room_name = 'eater';
                break;
            case 'g':
                room_name = 'eater';
                break;
            case 'h':
                room_name = 'eater';
                break;
            case 'i':
                room_name = 'eater';
                break;
            case 'z':
                room_name = 'feeder';
                break;
            default:
                break;
        }
        return room_name;
    } catch (error) {
        console.log("Err from: utils > validator > validateUniqueAccessToken > try: ", error.message)
        return false;
    }
    return true;
}
function getArrayFromMapObjectArray(mapObjectArray) {
    return Object.fromEntries(mapObjectArray);
}
module.exports = {
    getRoomByAccessToken,
    getArrayFromMapObjectArray
}