const router = require('express').Router();
const teampolicy = require('../../policies/team');
const Member = require('');

router.post('/setTeamName', teampolicy, (req, res) => {
    TeamID = req.body.TeamID
    Member.findByIdAndUpdate(TeamID, {
        $set: {
            teamName: req.body.teamName
        }
    })
})
module.exports = router;