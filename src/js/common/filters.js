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

let numToCh = str => {
    var chArray = ['一','二','三','四','五','六','七','八','九','十']
    if (str === '' || str === undefined) {
        return '';
    }
    return chArray[str];
}

export {
    currency,
    numFixed,
    numToCh
}