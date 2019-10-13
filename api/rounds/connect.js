const router = require('express').Router();
const teampolicy = require('../../policies/team');
const Member = require('.');

//if key=true open setName page
//if key=false open main page(with dashboard,leaderboard etc)

router.all('/connect', teampolicy, (req, res) => {
    TeamID = req.body.TeamID
    Member.findOne({ TeamID: TeamID }).then((user) => {
        if (user.teamname != '') return res.json({ 'key': false })
        else return res.json({ 'key': true })
    })
})
module.exports = router;
