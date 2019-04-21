const express = require('express')
const router = express.Router()
const docker = require('../libs/docker')

// List containers
router.get('/list', (req, res) => {
  docker.listContainers((err, containers) => {
    if (!containers) {
      const err = 'Docker not running!'
      console.error(err)
      res.json({
        success: false,
        error: err
      })
    } else {
      res.json(containers)
    }
  })
})

// Stop containers
router.get('/stop', (req, res) => {
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

 // Start container
router.get('/start/:id', (req, res) => {
  createContainer(res.json)
})

// Create container
const createContainer = async (res) => {
  docker.createContainer({
    Image: 'jwilder/whoami:latest',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    // Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
    OpenStdin: false,
    StdinOnce: false
  }).then((container) => {
    res.json({ success: true})
    return container.start()
  // }).then((container) => {
  //   return container.resize({
  //     h: process.stdout.rows,
  //     w: process.stdout.columns
  //   })
  // }).then((container) => {
  //   return container.stop()
  // }).then((container) => {
  //   return container.remove()
  // }).then((data) => {
  //   console.log('container removed')
  }).catch((err) => {
    res.json({ success: false, error: err })
    console.log('Error on start: ', err)
  })
}
router.get('/create', (req, res) => {
  createContainer(res)
})

module.exports = router
