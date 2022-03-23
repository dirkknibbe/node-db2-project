const Car = require("./cars-model");
const db = require("../../data/db-config");

const vinValidator = require("vin-validator");

exports.checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      next({
        status: 404,
        message: `car with id ${req.params.id} is not found`,
      });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC

  const { vin, make, model, mileage } = req.body;
  console.log(req.body);

  if (!vin) {
    res.status(400).json({ message: "vin is missing" });
  }
  if (!make) {
    res.status(400).json({ message: "make is missing" });
  }
  if (!model) {
    res.status(400).json({ message: "model is missing" });
  }
  if (!mileage) {
    res.status(400).json({ message: "mileage is missing" });
  }
  next();
};

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC

  const { vin } = req.body;
  const isValidVin = vinValidator.validate(vin);
  if (isValidVin === false) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existingVin = await db("cars")
      .where("vin", req.body.vin.trim())
      .first();

    if (existingVin) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
