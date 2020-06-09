const TFIDF = require('./tf-idf')
const fs = require('fs');

let data = [
    fs.readFileSync('./data/doc_one.txt', { encoding: 'utf-8' }),
    fs.readFileSync('./data/doc_two.txt', { encoding: 'utf-8' })
];
let tfdif = new TFIDF(data);

let newDoc = fs.readFileSync('./data/doc_three.txt', { encoding: 'utf-8' });
console.log(tfdif.getKeywordsPlain(newDoc))