let currency = str => {
    if (str === '' || str === undefined) {
        return '';
    }
    return '￥ ' + str;
}

let numFixed = str => {
    if (str === '' || str === undefined) {
        return '';
    }
    return Number(str).toFixed(2);
}

export {
    currency,
    numFixed
}