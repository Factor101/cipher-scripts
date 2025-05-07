'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'mostBalancedPartition' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY parent
 *  2. INTEGER_ARRAY files_size
 */

function mostBalancedPartition(parent, files_size)
{
    const dirSizes = new Map();
    dirSizes.set(0, files_size[0]);
    const n = parent.length - 1;
    for(let subdir = 1; subdir < parent.length; ++subdir)
    {
        const parentDir = parent[subdir];
        const subDirSize = files_size[subdir];
        const parentSize = files_size[parentDir];
        if(parentDir === 0)
        {
            console.log("parent size", parentSize, "subdir", subdir, "subdir size", subDirSize)
        }
        if(!dirSizes.has(subdir))
        {
            dirSizes.set(subdir, subDirSize);
        }

        if(!dirSizes.has(parentDir))
        {
            dirSizes.set(parentDir, subDirSize + parentSize);
        }
        else
        {
            dirSizes.set(parentDir, dirSizes.get(parentDir) + subDirSize);
        }
        // const updatedParentSize = !dirSizes.has(parentDir)
        //                             ? files_size[parentDir]
        //                             : dirSizes.get(parentDir) + subDirSize;
        // // update total parent size
        // dirSizes.set(parentDir, updatedParentSize);
    }

    dirSizes.forEach((v, k, m) => {
        console.log(`parent ${k} has total ${v}\n`);
    });
}

function Node(data = null)
{
    this.data = data;
    this.children = [];
}

function buildTree(parent, file_sizes)
{
    let parentDir = new Node();
    for(let i = 0; i < parent.length; ++i)
    {
        // i = subdirectory
        // parent[i] = parent of i

    }
}

function getChildren(parent, files_size, i)
{

}

function sumBranch()
{

}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const parentCount = parseInt(readLine().trim(), 10);

    let parent = [];

    for (let i = 0; i < parentCount; i++) {
        const parentItem = parseInt(readLine().trim(), 10);
        parent.push(parentItem);
    }

    const files_sizeCount = parseInt(readLine().trim(), 10);

    let files_size = [];

    for (let i = 0; i < files_sizeCount; i++) {
        const files_sizeItem = parseInt(readLine().trim(), 10);
        files_size.push(files_sizeItem);
    }

    const result = mostBalancedPartition(parent, files_size);

    ws.write(result + '\n');

    ws.end();
}
