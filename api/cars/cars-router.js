// DO YOUR MAGIC
const router = require("express").Router();

const mid = require("./cars-middleware");

const Car = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line no-unused-vars
router.get("/:id", mid.checkCarId, async (req, res, next) => {
  res.json(req.car);
});

router.post(
  "/",
  mid.checkCarPayload,
  mid.checkVinNumberValid,
  mid.checkVinNumberUnique,

  async (req, res, next) => {
    try {
      const newCar = await Car.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
