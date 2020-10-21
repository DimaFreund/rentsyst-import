export const jsToMysqlDateTime = (value) => {
    if(!value) {
        return '';
    }
    let date = new Date(value);
    return date.yymmddhhmmss();
}
