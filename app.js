#!/usr/bin/env node
var Stream = require('./Stream');
var Formatter = require('./HelpFormatter');
var colors = require('colors');
require('shelljs/global');

function gitInit() {
    return [{
        label: 'To create a new repo, first type ',
        cmd: 'git init'
    }, {
        label: 'Awesome, now check the status of your repo by typing ',
        cmd: 'git status'
    }, {
        label: 'If you have any files that are not yet committed, add them with ',
        cmd: 'git add',
        args: 'FILE_NAME'
    }, {
        label: 'Finally, commit your added files with ',
        cmd: 'git commit -m ',
        args: 'COMMIT_MESSAGE'
    }, {
        label: 'Sweet! You\'re done! To exit, type quit',
        cmd: ' '
    }];
}

function gitPush() {
    return [{
        label: 'ASSUMING you already have git set up in your repo, start by cd-ing into your repo directory ',
        cmd: 'cd ',
        args: 'DIRECTORY_PATH'
    }, {
        label: 'Ok great, now add the URL for the github repo you created to host your current local repo ',
        cmd: 'git remote add ',
        args: 'NAME_FOR_REPO(usually origin) REMOTE_REPOSITORY_URL'
    }, {
        label: 'Let\'s verify that the remote URL is recognized by Git. Type in ',
        cmd: 'git remote -v'
    }, {
        label: 'Ok sick, now finish this off by pushing to GitHub ',
        cmd: 'git push ',
        args: 'NAME_FOR_REPO(what you used for step 2) master'
    }, {
        label: 'Sweet! You\'re done! To exit, type quit',
        cmd: ' '
    }];
};

function gitUpdateRemote() {
    return [{
        label: 'To update the remote url of your repo, do this: ',
        cmd: 'git remote set-url ',
        args: 'NAME_OF_ORIGIN NEW_URL'
    }, {
        label: 'That\'s it! Donezo. To exit, type quit',
        cmd: ' '
    }];
}

var optsHash = {
    'h': getHelp,
    'm': {
        'newrepo': {
            data: gitInit,
            label: 'walk through the steps needed to create a new repo'
         },
         'pushrepo': {
            data: gitPush,
            label: 'take your local repo and push to a remote hosting service like github'
         },
         'updateremote': {
            data: gitUpdateRemote,
            label: 'update the url of your github repo'
         }
    }
};

function bootstrapApp() {

    var args = [].slice.call( process.argv );

    args.shift();
    args.shift();

    if ( args.length === 0 ) {
        getHelp();
        return;
    }

    var mode = args.shift();
    var doesModeExist = typeof optsHash.m[ mode ] !== "undefined";

    if ( !doesModeExist ) {
        getHelp();
        return;
    }

    var data = optsHash.m[ mode ].data();
    new Stream( data );
}
bootstrapApp();

function getHelp() {
    Formatter.clearScreen();

    Formatter.print(
        'GitTutor Help',
        Formatter.IMPORTANT,
        1
    ).print(
        'Welcome to GitTutor, here is how you run a command: ',
        Formatter.MESSAGE,
        1
    ).print(
        'gittutor' + ' [ONE_OF_THE_KEYWORDS_LISTED_BELOW]'.cyan,
        Formatter.NONE,
        1,
        1
    ).print(
        'Here are the currently supported options: ',
        Formatter.MESSAGE,
        1
    );

    var opts = optsHash.m;
    Object.keys( opts ).forEach(function( key ) {
        var val = opts[ key ];

        Formatter.print(
            key.cyan + ' -- ' + val.label,
            Formatter.PLAIN,
            0,
            1
        );
    });

    Formatter.print(
        '',
        Formatter.NONE,
        1
    );
} // getHelp

