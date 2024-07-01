const express=require("express")
const app=express(); // on going 

const fs = require('fs');
const path = require('path');

// Get arguments from command line
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error('Usage: node renameFiles.js <directoryPath> <newNamesList>');
    process.exit(1);
}

const directoryPath = path.resolve(args[0]);
const newNames = args[1].split(','); // split arg two and create an array with all the new names


fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        process.exit(1);
    }

    if (files.length !== newNames.length) {
        console.error('The number of files and new names must match');
        process.exit(1);
    }

    files.forEach((file, index) => {
        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(directoryPath, newNames[index]);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(`Error renaming file ${file} to ${newNames[index]}:`, err);
            } else {
                console.log(`File ${file} renamed to ${newNames[index]}`);
            }
        });
    });
});

