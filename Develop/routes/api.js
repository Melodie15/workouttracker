const router = require("express").Router();
const mongojs = require("mongojs");
const Workout=require("../models/index.js")


// pull all workouts
router.get("/workouts/range", (req, res) => {
    Workout.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    }).limit(7);
  });
  
// pull workouts
router.get("/workouts", (req, res) => {
  Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// create a new workout
router.post("/workouts", (req, res) => {
    Workout.create({})
      .then((exercises) => {
        res.json(exercises);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

// update a workout
router.put("/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete a workout
router.delete("/workouts/:id", (req, res) => {
  Workout.remove(
    {
      _id: mongojs.ObjectID(req.params.id),
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

module.exports = router;