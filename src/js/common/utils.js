    
export default {
    //relative link to absolute link
    handleUrl: function(str){
        if(!str){
            str = '';
        }else{
            str = str.indexOf('http') > -1 ? str : ('https://www.chel-c.com/' + str);
        }
        return str;
    },
}