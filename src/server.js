const Docker = require('dockerode')
const express = require('express')

const port = 6661
const app = express()
const docker = new Docker() //defaults to above if env variables are not used

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
  
  const createContainer = async (res) => {
    const container = docker.createContainer({
      Image: 'ubuntu',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
      OpenStdin: false,
      StdinOnce: false
    }).then((container) => {
      return container.start()
    }).then((container) => {
      return container.resize({
        h: process.stdout.rows,
        w: process.stdout.columns
      })
    }).then((container) => {
      return container.stop()
    }).then((container) => {
      return container.remove()
    }).then((data) => {
      console.log('container removed')
    }).catch((err) => {
      console.log(err)
    })
  }
  
  // Start container
  app.get('/containers/start/:id', (req, res) => {
    createContainer(res.json)
  })
  
  // Stop containers
  app.get('/containers/stop', (req, res) => {
    docker.listContainers((err, containers) => {
      if (containers) {
        containers.forEach(async (containerInfo) => {
          let stopped = []
          await docker.getContainer(containerInfo.Id).stop(() => stopped.push(containerInfo.Id))
          res.json(stopped)
        })
      }
    })
  })
  
  
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))  
}
module.exports = server