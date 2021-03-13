const minify = require('@node-minify/core');
const terser = require('@node-minify/terser');
const fs = require('fs');

fs.mkdirSync('./build/min', { recursive: true });

minify({
    compressor: terser,
    input: ['build/generic.js'],
    output: 'build/min/generic.min.js'
}).then(() => {
    console.log('Files minified successfully');
});
