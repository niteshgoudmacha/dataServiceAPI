const router = require('express').Router();
const mongoose = require('mongoose');
const Places = require('../models/places');


router.get('/get/all', async (req, res) => {
    try {
        const places = await Places.find({});
        // console.log(places);
        
        res.send(places);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/get/month/:month', async (req, res) => {
    try {
        const places = await Places.find({ month: req.params.month});
        // console.log(places);
        res.send(places);
    } catch (err) {
        res.status(500).send(err);
    }
    
});

router.get('/get/state/month/:state/:month', async (req, res) => {
    try {
        const places = await Places.find({ month: req.params.month, state: req.params.state});
            
        // console.log(places);
        res.send(places);
    } catch (err) {
        res.status(500).send(err);
    }
    
});

router.get('/get/state/:state', async (req, res) => {
    try {
        const places = await Places.find({ state: req.params.state});
        // console.log(places);
        res.send(places);
    } catch (err) {
        res.status(500).send(err);
    }
    
});

router.post('/post/state', async (req, res) => {
    const { location,
        districts,
        state,
        budget,
        month } = req.body;
    
    // console.log(req.body);
    try {
        const place = await Places.findOne({ state, month });
        if(place !== null)
            res.status(200).send(`Record Already Exists with State: ${state} and month: ${month}\nRecord: ${place}`);
        const places = new Places({
            state,
            location,
            districts,
            budget,
            month
        });
        await places.save();
        res.status(200).send("saved to db");
    } catch (err) {
        res.status(500).send("internal server error");
    }
});

router.post('/post/state/update', async (req, res) => {
    const { state, month } = req.body;
    try {
        // console.log(req.body);
        await Places.findOneAndUpdate({state, month}, req.body, {new: true, runValidators: true}, (err, place) => {
            if(err) {
                res.status(500).send(err);
            }
            if(place !== null)
                res.status(200).send(place);
            res.status(404).send(`No Record Found with State: ${state} and Month: ${month}\nPlease check your details.`);
        });
        
    } catch(err) {
        res.status(500).send(err);
    }

}); 


module.exports = router;