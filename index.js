const fs = require('fs');
const path = require('path');
const dereplication = require('./src/dereplication');

const rootDir = path.resolve(__dirname, "dataSource");
const targetDir = path.resolve(__dirname, "target");

const dataSources = fs.readdirSync(rootDir);

for(let i=0; i<dataSources.length; i++) {
    const currentDataSource = path.parse(path.resolve(rootDir, dataSources[i]));

    const input = fs.readFileSync(path.join(currentDataSource.dir, currentDataSource.base), 'utf8');
    const output = fs.createWriteStream(path.join(targetDir, currentDataSource.base));
    
    dereplication(input, output);

}



