module.exports = {
  entry: './app/App.js',
  output: {
    path: './',
    filename: 'public/index.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }
    ]
  }
}
