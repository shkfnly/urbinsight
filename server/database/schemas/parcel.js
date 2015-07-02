/**
  *Schema for Parcel
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// {
//         "0": { type: Number, default: 0 },
//         "1": { type: Number, default: 0 },
//       }
var parcelSchema = new Schema({
  "author": String,
  "date": { type: Date, default: Date.now },
  "timeHorizon": Number,
  "cityName": String,
  "describeParcel": {
    "parcelIdentification": {
      "parcelType": { type: String, default: "Generic Parcel" },
      "designatedLandUse": { type: String, default: "Residential" },
      "actualLandUse": { type: String, default: "Residential" },
      "geoCoordinates": { type: Array, default: [0, 0]},
      "landArea": { type: Number, default: 0 },
      "buildingFootprint": { type: Number, default: 0 }
    },
    "buildingData": {
      "buildingAttachmentType": { type: String, default: "Single Family" },
      "numberOccupiedDwellingUnits": { type: Number, default: 0 },
      "buildingAge": { type: Number, default: 0 },
      "aboveGroundStories": { type: Number, default: 0 },
      "belowGroundStories": { type: Number, default: 0 },
      "interiorFloorSpace": { type: Number, default: 0 },
      "separateDwellingUnits": { type: Number, default: 0 },
      "foundationType": { type: String, default: "Slab-on-Grade" },
      "wallType": { type: String, default: "Solid Masonry" },
      "roofType": { type: String, default: "Peaked Hard Surface" }
    },
    "demographics": {
      "seniors": {
        "livingWorking": { type: Number, default: 0 },
        "livingOffWorking": { type: Number, default: 0 },
        "visitingWork": { type: Number, default: 0 },
        "visitingPartTimeWork": { type: Number, default: 0 }
      },
      "adults": {
        "livingWorking": { type: Number, default: 0 },
        "livingOffWorking": { type: Number, default: 0 },
        "visitingWork": { type: Number, default: 0 },
        "visitingPartTimeWork": { type: Number, default: 0 }
      },
      "youth": {
        "livingWorking": { type: Number, default: 0 },
        "livingOffWorking": { type: Number, default: 0 },
        "visitingWork": { type: Number, default: 0 },
        "visitingPartTimeWork": { type: Number, default: 0 }
      }
    }
  },
  "workbooks": {
    "water": {
      "estimateDemand": {
        "landCoverPreCalculation": {
          "percentageOfParcelWithRainwaterCatchment": { type: Number, default: 0 },
          "surfaceTypes": {
            "turfGreen": {
              "effectivePermeability": { type: Number, default: 0.5 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "perennialGrassesAndShrubs": {
              "effectivePermeability": { type: Number, default: 0.75 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "treeCanopyOverVegetatedGround": {
              "effectivePermeability": { type: Number, default: 0.9 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "treeCanopyOverSealedSurfaces": {
              "effectivePermeability": { type: Number, default: 0.25 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "wetOrDryPondsAndInfiltrationTrenches": {
              "effectivePermeability": { type: Number, default: 1 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "vegetatedRoof": {
              "effectivePermeability": { type: Number, default: 0.8 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "mainRoof": {
              "effectivePermeability": { type: Number, default: 0.0 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "secondaryRoof": {
              "effectivePermeability": { type: Number, default: 0.0 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "openDecking": {
              "effectivePermeability": { type: Number, default: 0.75 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "sealedDecking": {
              "effectivePermeability": { type: Number, default: 0.0 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "gravel": {
              "effectivePermeability": { type: Number, default: 0.6 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "bareEarth": {
              "effectivePermeability": { type: Number, default: 0.4 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "sealedPavement": {
              "effectivePermeability": { type: Number, default: 0.0 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "paversAndBricks": {
              "effectivePermeability": { type: Number, default: 0.5 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
            "permeableAsphalt": {
              "effectivePermeability": { type: Number, default: 0.7 },
              "portionOfParcel": { type: Number, default: 0.0 }
            },
          }
        },
        "demandJunctions": {
          "toilets": {
            "activeToilets": {
              "regUsedToiletA": {
                "flushVolume": { type: Number, default: 0.0 }
              },
              "regUsedToiletB": {
                "flushVolume": { type: Number, default: 0.0 }
              }
            },
            "numPersonsUsingToilets": { type: Number, default: 0.0 },
            "dailyPerPersonUsage": { type: Number, default: 0.0 }
          },
          "hygiene": {
            "activeShowers": {
              "showerA": { type: Number, default: 0.0 }
            },
            "typicalShowerDuration": { type: Number, default: 0.0 },
            "weeklyShowersPerPerson": { type: Number, default: 0.0 },
            "bathVolume": { type: Number, default: 0.0 },
            "bathsPerWeek": { type: Number, default: 0.0 },
            "minutesOfTapFlowPerVisit": { type: Number, default: 0.0 },
            "ablutionDuration": { type: Number, default: 0.0 },
            "numOccupantsUsingWashrooms": { type: Number, default: 0.0 },
            "numVisitsToWashroomPerOccupant": { type: Number, default: 0.0 }
          },
          "kitchen": {
            "quantityOfMealsPerDay": { type: Number, default: 0.0 },
            "waterPerMeal": { type: Number, default: 0.0 },
            "dishwashingWaterPerLoad": { type: Number, default: 0.0 },
            "loadsOfDishesPerDay": { type: Number, default: 0.0 },
            "waterConsumptionPerMeal": { type: Number, default: 0.0 }
          },
          "laundry": {
            "personsUsingLaundry": { type: Number, default: 0.0 },
            "loadsPerWeekPerPerson": { type: Number, default: 0.0 },
            "waterConsumptionPerLoad": { type: Number, default: 0.0 }
          },
          "drinking": {
            "personsDrinkingWaterOnSite": { type: Number, default: 0.0 },
            "avgQuantityOfDrink": { type: Number, default: 0.0 },
            "avgDrinksPerDayPerPerson": { type: Number, default: 0.0 }
          },
          "landscape": {
            "irrigation": {
              "hoursPerWeek": { type: Number, default: 0.0 }
            },
            "potsPools": {
              "litersPerLocation": { type: Number, default: 0.0 },
              "numPlantsPools": { type: Number, default: 0.0 }
            }
          },
          "surfaceCleaning": {
            "freqOfInteriorSurfaceCleaning": { type: Number, default: 0.0 },
            "quantityOfWaterUsedForSC": { type: Number, default: 0.0 },
            "numTimesVehicleCleaned": { type: Number, default: 0.0 },
            "quantityOfWaterUsedForVC": { type: Number, default: 0.0 }
          },
          "evaporativeCooling": {
            "hoursPerDayDuringHotSeason": { type: Number, default: 0.0 },
            "litersConsumedPerHour": { type: Number, default: 0.0 }
          },
          "waterCustomers": {
            "excessCapacityPerDay": { type: Number, default: 0.0 },
            "percentageOfExcessDistributed": { type: Number, default: 0.0 }
          }
        }
      }
    }
  }
})

var Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;