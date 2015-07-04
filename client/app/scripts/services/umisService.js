'use strict';

angular.module('urbinsight.services')
  .factory('UMISFactory', function () {
    var countProperties = function(obj) {
      var count = 0;

      for(var prop in obj) {
        if(obj.hasOwnProperty(prop)){
          ++count;
        }
      }
      return count;
    };

    var customForEach = function (collection, callback){

      if(Array.isArray(collection)){
        for(var i = 0; i < collection.length; i++){
          callback(collection[i], i, collection);
        }
      }
      else {
        for(var item in collection){
          callback(collection[item], item, collection);
        }
      }
    };

    var UMIS = {};
    UMIS.DEFAULTS = {};
    UMIS.Calculations = {};
    UMIS.Water = {};
    UMIS.Energy = {};
    UMIS.Materials = {};
    UMIS.Mobility = {};

    UMIS.Water.totalConsumption = {};

    UMIS.Water.totalConsumption.landscape = function(workbook, parcel){
      var functions = UMIS.Water.totalConsumption.landscape;
      return functions.unmediatedRainfall(workbook, parcel) + functions.totalIrrigation(workbook) + functions.totalPotsPools(workbook);
    };


    UMIS.Water.totalConsumption.landscape.totalPotsPools = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .landscape
                        .potsPools;
      return ( obj.litersPerLocation + obj.numPlantsPools ) / 7;
    };

    UMIS.Water.totalConsumption.landscape.totalIrrigation = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .landscape
                        .irrigation;
      return ( obj.hoursPerWeek * obj.avgFlowRate ) * 60 / 7;
    };
    UMIS.Water.runOffLitersPerDay = function(workbook){
      return UMIS.Water.unmediatedRainfall(workbook) * 
              UMIS.Water.totalAveragePermeability;
    };

    UMIS.Water.infiltrationPerDay = function(workbook){
      return UMIS.Water.unmediatedRainfall(workbook) *
        (1 - UMIS.Water.totalAveragePermeability);
    };

    UMIS.Water.totalConsumption.landscape.unmediatedRainfall = function(workbook, parcel){
      var obj1 = workbook.estimateDemand
                         .demandJunctions
                         .landscape;
      var obj2 = parcel.describeParcel;
      return ( obj1.weather.seasonTotal / obj1.weather.seasonLength ) *
                obj2.parcelIndetification.landArea * 
                  workbook.estimateDemand
                          .landCoverPreCalculation
                          .percentageOfParcelWithRainwaterCatchment;

    };
    UMIS.Water.totalConsumption.waterCustomers = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .waterCustomers;
      return ( obj.excessCapacityPerDay * obj.percentageOfExcessDistributed ) * 1000; 
    };

    UMIS.Water.totalConsumption.evaporativeCooling = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .evaporativeCooling;
      return ( obj.hoursPerDayDuringHotSeason * obj.litersConsumedPerHour );
    };
    UMIS.Water.totalConsumption.surfaceCleaning = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .surfaceCleaning;
      return ( obj.freqOfInteriorSurfaceCleaning * obj.quantityOfWaterUsedForSC +
                obj.numTimesVehicleCleaned * obj.quantityOfWaterUsedForVC );
    };

    UMIS.Water.totalConsumption.drinking = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .drinking;
      return ( obj.personsDrinkingWaterOnSite * obj.avgQuantityOfDrink *
                obj.avgDrinksPerDayPerPerson );
    };

    UMIS.Water.totalConsumption.laundry = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .laundry;
      return ( obj.personsUsingLaundry * obj.loadsPerWeekPerPerson *
                obj.waterConsumptionPerLoad ) / 7;
    };

    UMIS.Water.totalConsumption.kitchen = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .kitchen;
      return obj.quantityOfMealsPerDay * obj.waterPerMeal + obj.dishwashingWaterPerLoad * obj.loadsOfDishesPerDay;
    };
    UMIS.Water.totalConsumption.hygiene = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .hygiene;
      return  ( UMIS.Water.totalConsumption.hygiene.avgShowerConsumption(workbook) * obj.typicalShowerDuration *
                obj.weeklyShowersPerPerson )+
              ( obj.bathVolume * obj.bathsPerWeek ) / 7 + 
              ( obj.minutesOfTapFlowPerVisit * obj.ablutionDuration * 
                obj.numOccupantsUsingWashrooms * obj.numVisitsToWashroomPerOccupant );
              
    };


    UMIS.Water.totalConsumption.hygiene.avgShowerConsumption = function(workbook){
      var totalFlow = 0;
      var count = 0;
      customForEach(workbook.estimateDemand
              .demandJunctions
              .hygiene
              .activeShowers, function(value){
                totalFlow += value;
                count++;
              });
      return totalFlow/count;
    };


    UMIS.Water.averagePermeability = function(workbook, surfaceType){
      return  workbook.estimateDemand
                     .landCoverPreCalculation
                     .surfaceTypes[surfaceType]
                     .effectivePermeability *
              workbook.estimateDemand
                      .landCoverPreCalculation
                      .surfaceTypes[surfaceType]
                      .portionParcel;
    };

    UMIS.Water.totalAveragePermeability = function(workbook){
      var total = 0;
      workbook.estimateDemand
              .landCoverPreCalculation
              .surfaceTypes
              .forEach(function(surfaceType){
        total += UMIS.Water.averagePermeability(workbook, surfaceType);
      });
      return total;
    };
    UMIS.Water.totalToilets = function(workbook){
      var obj = workbook.estimateDemand
                        .demandJunctions
                        .toilets
                        .activeToilets;
      return countProperties(obj);
    };

    //might need to write a for each.

    UMIS.Water.averageFlush = function(workbook){
      var totalToilets = this.totalToilets(workbook);
      var totalFlushVolume = 0;
      var toilets = workbook.estimateDemand
                            .demandJunctions
                            .toilets
                            .activeToilets;
      customForEach(toilets, function(obj){
                totalFlushVolume += obj.flushVolume;
              });
      return totalFlushVolume / totalToilets;
    };

    UMIS.Water.totalConsumption.toilets = function(workbook, parcel){
      return UMIS.Water.averageFlush(workbook) * UMIS.Calculations.totalEffectiveOccupancy(parcel) *
        workbook.estimateDemand.demandJunctions.toilets.dailyPerPersonUsage;
    };
    UMIS.Calculations.effectiveOccupancyByAge = function(parcel, ageType){
      var total = 0;
      customForEach(parcel.describeParcel.demographics[ageType], function(value, key){
        if(key === 'livingWorking'){
          total += value;
        }
        else {
          total += (value * 0.5);
        }
      });
      return total;
    };

    UMIS.Calculations.totalEffectiveOccupancy = function(parcel){
      var total = 0;
      var ageTypes = ['seniors', 'adults', 'youth'];
      ageTypes.forEach(function(ageType){
        total += UMIS.Calculations.effectiveOccupancyByAge(parcel, ageType);
      });
      return total;
    };
    return {
      totalConsumption: function(workbook, parcel){
        var result = {};
        result.Toilets = UMIS.Water.totalConsumption.toilets(workbook, parcel);
        result.Hygiene = UMIS.Water.totalConsumption.hygiene(workbook);
        result.Kitchen = UMIS.Water.totalConsumption.kitchen(workbook);
        result.Laundry = UMIS.Water.totalConsumption.laundry(workbook);
        result.Drinking = UMIS.Water.totalConsumption.drinking(workbook);
        // result['Landscape'] = UMIS.Water.totalConsumption.landscape(workbook, parcel);
        result['Surface Cleaning'] = UMIS.Water.totalConsumption.surfaceCleaning(workbook);
        result['Evaporative Cooling'] = UMIS.Water.totalConsumption.evaporativeCooling(workbook);
        result['Water Customers'] = UMIS.Water.totalConsumption.waterCustomers(workbook);
        return result;
      }
    };
  });