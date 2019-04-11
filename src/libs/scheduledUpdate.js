const schedule = require('node-schedule')
const Git = require('nodegit')

module.exports = () => {
  let startTime = new Date(Date.now() + 1500)
  // let endTime = new Date(startTime.getTime() + 5000);
  var j = schedule.scheduleJob({ start: startTime }, () => {
    console.log('Time for tea!');
    Git.Repository.open(__dirname)
    // Open the master branch.
    .then((repo) => {
      console.log('REPO', repo)
      return repo.mergeBranches("master", "origin/master");
    })
    .catch(err => { throw err })
    // Display information about commits on master.
  })
}