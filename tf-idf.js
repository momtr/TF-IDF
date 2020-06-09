/**
 * Term Frequency - Inverse Document Frequency
 */

class TFIDF {

    /**
     * Constructor function
     * @param {Array} documentsArray array of strings containing test documents
     */
    constructor(documentsArray, modelJSON) {
        this.docs = documentsArray;
        this.words = {};
        this.wordDocs = [];
        this.n = documentsArray.length;
        this.allWords = [];

        /** (1) get all words */
        for(let i of documentsArray) {
            let allWords = this.stringToArray(i);
            this.wordDocs.push(allWords);
            for(let word of allWords) {
                if(this.allWords.indexOf(word) === -1)
                    this.allWords.push(word);
            }
        }

        /** (2) calculate idf (= inverse document frequency) score for each word */
        for(let i of this.allWords) {
            let numOfDocs = 0;
            for(let j of this.wordDocs) {
                numOfDocs += ((j.indexOf(i) != -1) ? 1 : 0);
            }
            this.words[i] = { idf: Math.log10(this.n / numOfDocs) };
        }

    }

    stringToArray(string) {
        let deleteChars = ['\n', '.', ';', ':', '!', '?', ')', '(', '/', '%', '\'', '"'];
        string = string.toLowerCase();
        for(let cond of deleteChars)
            string = string.split(cond).join('');
        return string.split(' ');
    }

    getInverseDocumentFrequency(word) {
        if(this.words[word])
            return this.words[word].idf;
        return Math.log10(this.n + 1);
    }

    getTermFrequency(wordsArray) {
        let words = {};
        let n = wordsArray.length;
        for(let i of wordsArray) {
            if(!words[i]) {
                words[i] = {};
                words[i].tf = 1;
            }
            else
                words[i].tf++;
        }
        for(let i of Object.keys(words)) {
            words[i].tf /= n;
        }
        return words;
    }

    getKeywords(document) {
        let words = this.stringToArray(document);
        let wordsTF = this.getTermFrequency(words);
        words = words.filter((val, index, self) => (self.indexOf(val) === index))
        let wordsMeta = [];
        for(let i of words) {
            let idf = this.getInverseDocumentFrequency(i);
            wordsMeta.push({ word: i, score: wordsTF[i].tf * idf });
        }
        /** sort array of keywords according to their scores */
        wordsMeta.sort((a, b) => {
            if(a.score > b.score) return -1;
            return 1;
        })
        return wordsMeta;
    }

    getKeywordsPlain(document, num = 3) {
        let keywords = this.getKeywords(document)
        return keywords
                    .slice(0, ((num < keywords.length) ? num : keywords.length))
                    .map(val => val.word);
    }

}

module.exports = TFIDF;