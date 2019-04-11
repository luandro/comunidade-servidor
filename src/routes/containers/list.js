// List containers
app.get('/containers/list', (req, res) => {
  docker.listContainers((err, containers) => {
    res.json(containers)
  })
})