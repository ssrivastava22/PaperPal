module.exports = {
    presets: [
      '@babel/preset-env', // This preset enables the use of modern JavaScript features
      '@babel/preset-react' // This preset is required if you're using React with JSX
    ],
    plugins: [
      // Add any additional plugins you might need
      // For example, if you're using class properties syntax, you might need the following plugin
      // '@babel/plugin-proposal-class-properties'
    ]
  };
  