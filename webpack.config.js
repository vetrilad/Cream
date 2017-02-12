module.exports = {
     entry: './lib/index.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 }
