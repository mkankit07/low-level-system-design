const VehicleType = Object.freeze({
  MOTORCYCLE: "Motorcycle",
  CAR: "Car",
  BUS: "Bus",
});

const SpotSize = Object.freeze({
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large",
});

class Vehicle {
  constructor(licensePlate, vehicleType) {
    // your code here
  }
}

class ParkingSpot {
  constructor(spotId, size) {
    // your code here
  }

  isAvailable() {
    // your code here
  }

  canFitVehicle(vehicle) {
    // your code here
  }

  parkVehicle(vehicle) {
    // your code here
  }

  removeVehicle() {
    // your code here
  }
}

class ParkingLevel {
  constructor(levelId, numSpots) {
    // your code here
  }

  _initializeSpots(numSpots) {
    // your code here
  }

  findAvailableSpot(vehicle) {
    // your code here
  }

  getAvailableSpotsCount(vehicleType) {
    // your code here
  }
}

class ParkingLot {
  constructor(numLevels, spotsPerLevel) {
    // your code here
  }

  parkVehicle(vehicle) {
    // your code here
  }

  removeVehicle(licensePlate) {
    // your code here
  }

  getAvailableSpots(vehicleType) {
    // your code here
  }
}

// Your code will be instantiated and invoked as follows:
/*
const vCar = new Vehicle("C123", VehicleType.CAR);
const vBus = new Vehicle("B999", VehicleType.BUS);
const vMoto = new Vehicle("M001", VehicleType.MOTORCYCLE);

const lot = new ParkingLot(2, 10);
lot.parkVehicle(vCar);
lot.parkVehicle(vBus);
lot.getAvailableSpots(VehicleType.MOTORCYCLE);
lot.parkVehicle(vMoto);
lot.removeVehicle("C123");
lot.getAvailableSpots(VehicleType.CAR);
*/
