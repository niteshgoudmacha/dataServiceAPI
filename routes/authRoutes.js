const router = require('express').Router();
const mongoose = require('mongoose');
const Places = require('../models/places');


router.get('/get/places', async (req, res) => {
    const places = await Places.find({});
    // console.log(places);
    res.send(places);
});

router.get('/get/places/:month', async (req, res) => {
    const places = await Places.find({ month: req.params.month});
    // console.log(places);
    res.send(places);
});

router.post('/post/places', async (req, res) => {
    const { location,
        districts,
        state,
        budget,
        month } = req.body;
    const places = new Places({
        state,
        location,
        districts,
        budget,
        month
    });
    console.log(req.body);
    try {
        await places.save();
        res.status(200).send("saved to db");
    } catch (err) {
        res.status(500).send("internal server error");
    }
});
module.exports = router;