
var $f = {};

$f.consoleLog = function(){
    if ('console' in this && 'log' in this.console) {
        try {
            return this.console.log.apply(this.console, arguments);
        } catch (err) {// For IE
            var args = Array.prototype.slice.apply(arguments);
            return this.console.log(args.join(' '));
        }
    }
}

$f.format = function() {
    var args, fmt, result;

    args = Array.apply([], arguments);
    fmt = typeof this === "string" ? this : args.shift();

    if (args.length === 1 && typeof args[0] === "object") {
        args = args[0];
    };

    result = fmt.replace(/{([^}]+)}/g, function (s, id) {
        var chain = id.split("."), substr, i;
        if (chain.length >= 2) {
            substr = args[chain[0]];
            for (i = 1; i < chain.length; i++) {
                substr = substr[chain[i]];
            }
        } else {
            substr = args[id];
        }
        return substr;
    });

    return result;
}

$f.randChoice = function(arr){
    return arr[Number.random(0, arr.length - 1)];
}

$f.pointsToDistance = function(a, b){
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

$f.__NL2BR_PATTERN__ = /(?:\r\n|\n|\r)/g;
$f.nl2br = function(str){
      var br = '<br style="letter-spacing:0;" />';
    return str.replace($f.__NL2BR_PATTERN__, br);
}
