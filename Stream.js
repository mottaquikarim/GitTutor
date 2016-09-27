var colors = require('colors');
require('shelljs/global');

//var exec = require('child_process').exec;
process.stdin.setEncoding('utf8');

function _done() {
    process.exit();
}
console.log( exec('node --version', {silent:true}).output );
var timeout;
function _execCmd( text ) {
    console.log('Running your command...'.green);
    _run.call( this );

    function _run() {
        var cmd;
        if ( text ) {
            cmd = text;
        }
        else {
            cmd = this.data[ this.ptr ].cmd;
        }
        var output = exec( cmd, {silent:true});

        console.log( output.output );

        ++this.ptr;

        _updateScreen.call( this );
    }
}

function _initData() {
    process.stdin.on('data', function (text) {

        if (text.trim() === this.data[ this.ptr ].cmd) {
            _execCmd.call( this );
        }
        else if ( text.trim().indexOf( this.data[ this.ptr ].cmd ) !== -1 ) {
            _execCmd.call( this, text.trim() );
        }
        else if ( text.trim() !== 'quit' ) {
            console.log(("Whoops! That's not " + this.data[ this.ptr ].cmd + "! If you'd like to exit, pleaes type 'quit' or Ctrl+C").cyan);
            process.stdout.write("Your turn $ ".red);
        }

        if ( text === 'quit\n' ) {
            _done();
        }

        if ( this.ptr === this.data.length ) {
            _done();
        }
    }.bind(this));
}

function _clearWindow() {
    return;
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log(' ');
    }
}

function _updateScreen() {
    if ( this.ptr === 0 ) {
        _clearWindow();
    }
    var str = "gittutor:".blue + __dirname.split('/').pop() + "$: ";
    str += this.data[ this.ptr ].label + "";
    str += this.data[ this.ptr ].cmd.green + " ";

    if ( this.data[ this.ptr ].args ) {
        str += this.data[ this.ptr ].args.blue + '\n';
    }
    else {
        str += '\n';
    }

    str += "Your turn $ ".red;
    process.stdout.write( str );
}

function Stream( data ) {
    this.data = data;
    this.ptr = 0;

    _updateScreen.call( this );
    _initData.call( this );
}

module.exports = function( data ) {
    return new Stream( data );
}
