const express = require('express');
const milestoneMiddleware = require('../middlewares/milestone');
const router = express.Router();

router.get('/', milestoneMiddleware.readAllMilestone);

router.get('/issuecount', milestoneMiddleware.readMilestoneIssueCount);

router.get('/:state', milestoneMiddleware.readMilestone);
router.post('/', milestoneMiddleware.createMilestone);
router.put('/:milestoneid', milestoneMiddleware.updateMilestone);
router.delete('/:milestoneid', milestoneMiddleware.deleteMilestone);

router.get('/:milestoneid/issue', milestoneMiddleware.readIssueByMilestone);
router.post('/:milestoneid/issue', milestoneMiddleware.createIssueByMilestone);
router.put('/:milestoneid/state', milestoneMiddleware.updateMilestoneState);

module.exports = router;
