const express = require('express')
const docker = require('./libs/docker')
const containersRoutes = require('./routes/containers')
const port = 6661
const app = express()

// create a container entity. does not query API
// const container = docker.getContainer('71501a8ab0f8')

// // query API for container info
// container.inspect((err, data) => {
//   console.log(data)
// })

// container.start((err, data) => {
//   console.log(data)
// })

// container.remove((err, data) => {
//   console.log(data)
// })

async function server () {
  require('./libs/scheduledUpdate')()
  const buildImage = async () => {
    let stream = await dockerode.buildImage({
      context: __dirname,
      src: ['Dockerfile']
    }, {t: imageName}, (err, response) => {
    })
    await new Promise((resolve, reject) => {
      dockerode.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res))
    })
  }
  
  // Routes
  app.use('/containers', containersRoutes)

  
  
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))  
}
module.exports = server