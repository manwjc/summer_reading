export default {
    currency: (str) => {
        if (str === '' || str === undefined) {
            return '';
        }
        return '￥ ' + str;
    },
    numFixed: (str) => {
        if (str === '' || str === undefined) {
            return '';
        }
        return Number(str).toFixed(2);
    },
    numToCh: (str) => {
        var chArray = ['一','二','三','四','五','六','七','八','九','十']
        if (str === '' || str === undefined) {
            return '';
        }
        return chArray[str];
    }
}