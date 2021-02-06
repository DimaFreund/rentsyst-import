import moment from "moment";

export const jsToMysqlDateTime = (value, currentMask = null, resultMask = "YYYY-MM-DD hh:mm:ss") => {
    if(!value) {
        return '';
    }
    let dateTime = moment(value, currentMask);
    if(!dateTime.isValid()) {
        return '';
    }
    return dateTime.format(resultMask);
}
