var colors = require('colors');

var Formatter = {};

Formatter.NONE = -1;
Formatter.PLAIN = 0;
Formatter.MESSAGE = 1;
Formatter.IMPORTANT = 2;

Formatter.print = function( message, logLevel, numNewLines, numTabs) {
    var str = message;

    if ( typeof logLevel === "number" ) {
        if ( logLevel === Formatter.PLAIN ) {
            logLevel = 'white';
        }
        else if ( logLevel === Formatter.MESSAGE ) {
            logLevel = 'red';
        }
        else if ( logLevel === Formatter.IMPORTANT ) {
            logLevel = 'cyan';
        }
        else if ( logLevel === Formatter.NONE ) {
            logLevel = null;
        }
        else {
            logLevel = 'white';
        }
    }

    if ( logLevel ) {
        str = str[ logLevel ];
    }

    var tabs = '';
    if ( numTabs ) {
        for( var i = 0; i < numTabs; ++i ) {
            tabs += '\t';
        }
        str = tabs + str;
    }

    console.log( str );
    if ( numNewLines ) {
        var newLines = '';
        for( i = 0; i < numNewLines-1; ++i ) {
            newLines += '\n';
        }
        console.log( newLines );
    }

    return Formatter;
}

Formatter.clearScreen = function() {
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log(' ');
    }
}

module.exports = Formatter;
