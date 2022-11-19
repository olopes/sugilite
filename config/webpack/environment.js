
const { environment } = require('@rails/webpacker')

const webpack = require('webpack')
const dotenv = require('dotenv')

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env',
]
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true })
})

// environment.splitChunks();


// Hide warnings about 'configuration.node should be one of these...'

const customConfig = {
  resolve: {
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      path: false,
      tls: false,
      child_process: false
    }
  }
};

environment.config.delete('node.dgram')
environment.config.delete('node.fs')
environment.config.delete('node.net')
environment.config.delete('node.tls')
environment.config.delete('node.child_process')

environment.config.merge(customConfig);


module.exports = environment
