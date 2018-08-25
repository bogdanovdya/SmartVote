function fromHex(hex,str){
    try {
        str = decodeURIComponent(hex.replace(/(..)/g,'%$1'))
    }
    catch(e) {
        str = hex
        console.log('invalid hex input: ' + hex)
    }

    return str
}

function toHex(str,hex){
    try {
      hex = unescape(encodeURIComponent(str))
      .split('').map(function(v){
        return v.charCodeAt(0).toString(16)
      }).join('')
    }
    catch(e) {
      hex = str
      console.log('invalid text input: ' + str)
    }

    while (hex.length < 64) {
        hex = hex + '0'
    } 

    return hex
}

module.exports = {fromHex, toHex};