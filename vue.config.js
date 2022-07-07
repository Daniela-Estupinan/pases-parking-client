const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
    proxy:"https://pases-parking-dbem.com", //backend address
  }
})
