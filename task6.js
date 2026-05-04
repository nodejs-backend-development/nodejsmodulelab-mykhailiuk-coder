/*
- Реалізуйте CustomStream, який кожний символ введеного з консолі тексту перетворює на великі літери 
(не змінюючі числа) і вивести в лог.
- Реалізуйте CustomStream, який рахує слова, символи з введеного з консолі тексту 
та виводить текст та статистику в лог.
- Реалізуйте CustomStream що підсвічує ключові слова ANSI-кольорами. 
Список слів та кольорів передається у конструктор. Числа підсвічуються окремо.
*/

const { Transform } = require('stream');

class UpperCaseStream extends Transform {
    _transform(chunk, encoding, callback) {
        const result = chunk.toString().replace(/[^\d]/g, (char) => char.toUpperCase());
        this.push(result);
        callback();
    }
}

class StatisticsStream extends Transform {
    constructor(options) {
        super(options);
        this.charCount = 0;
        this.wordCount = 0;
    }

    _transform(chunk, encoding, callback) {
        const text = chunk.toString().trim();
        if (text) {
            this.charCount += text.length;
            this.wordCount += text.split(/\s+/).filter(w => w.length > 0).length;
            
            console.log(`\n--- Текст: ${text}`);
            console.log(`--- Статистика: слів: ${this.wordCount}, символів: ${this.charCount}\n`);
        }
        this.push(chunk);
        callback();
    }
}

class ColorHighlightStream extends Transform {
    constructor(config) {
        super();
        this.config = config; 
        this.reset = '\x1b[0m';
        this.numberColor = '\x1b[33m'; 
    }

    _transform(chunk, encoding, callback) {
        let text = chunk.toString();
        text = text.replace(/\b(\d+)\b/g, `${this.numberColor}$1${this.reset}`);
        for (const [word, color] of Object.entries(this.config)) {
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');
            text = text.replace(regex, `${color}$1${this.reset}`);
        }
        this.push(text);
        callback();
    }
}

const colorConfig = {
    'node': '\x1b[34m',
    'stream': '\x1b[32m',
    'hello': '\x1b[35m'
};

const upper = new UpperCaseStream();
const stats = new StatisticsStream();
const color = new ColorHighlightStream(colorConfig);

console.log("Введіть текст (наприклад: 'hello node stream 123'):");

process.stdin
    .pipe(upper)
    .pipe(stats)
    .pipe(color)
    .pipe(process.stdout);
