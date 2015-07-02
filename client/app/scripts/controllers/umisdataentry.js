'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UmisdataentryCtrl
 * @description
 * # UmisdataentryCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('umisDataEntryCtrl', function ($scope, $http, $stateParams, ParcelFactory, MapFactory) {

    var parcel;
    $scope.parcel = parcel = ParcelFactory.getCurrentParcel();
    $scope.parcel.cityName = $stateParams.city_name;


    MapFactory.getMap().on('click', function(e) {
      $scope.parcel.describeParcel.parcelIdentification.geoCoordinates[0] = e.latlng.lat;
      $scope.parcel.describeParcel.parcelIdentification.geoCoordinates[1] = e.latlng.lng;
    });

    MapFactory.renderParcels($stateParams.city_name);

    $scope.submit = function () {
      ParcelFactory.saveParcel($stateParams.city_name, function(param){});
      MapFactory.renderParcels($stateParams.city_name);
    }

  //   {
  //     author: '',
  //     date: '01/01/2015',
  //     neighborhoodID': int(dropdown),
  //     'timeHorizon': int(CalendarYear),
  //     'describeParcel': {
  //       'parcelIndetification': { 'parcelType': string(dropdown),
  //                                 'designatedLandUse': string(dropdown),
  //                                 'actualLandUse': string(dropdown),
  //                                 'geoCoordinates': [Lat, Lng],
  //                                 'landArea': int(square meters),
  //                                 'buildingFootprint': int(square meters)},
  //       'buildingData': { 'buildingAttachmentType': string(dropdown),
  //                         'numberOccupiedDwellingUnits': int,
  //                         'buildingAge': int(years),
  //                         'aboveGroundStories': int(stories),
  //                         'belowGroundStories': int(stories),
  //                         'interiorFloorSpace': int(square meters),
  //                         'separateDwellingUnits': int,
  //                         'foundationType': string(dropdown),
  //                         'wallType': string,
  //                         'roofType': string },
  //       'demographics': {
  //         'seniors': {
  //           'livingWorking': int,
  //           'livingOffWorking': int,
  //           'visitingWork': int,
  //           'visitingPartTimeWork': int
  //         },
  //         'adults': {
  //           'livingWorking': int,
  //           'livingOffWorking': int,
  //           'visitingWork': int,
  //           'visitingPartTimeWork': int
  //         },
  //         'youth': {
  //           'livingWorking': int,
  //           'livingOffWorking': int,
  //           'visitingWork': int,
  //           'visitingPartTimeWork': int
  //         }
  //       }                              
  //     },










  //     'workbooks' : {
  //       'water': {
  //         'estimateDemand': {
  //           'landCoverPreCalculation': {
  //             'percentageOfParcelWithRainwaterCatchment': percentage,
  //             'surfaceTypes': {
  //               'turf(green)': { 
  //                 'effectivePermeability': float <= 1(.50),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'perennialGrassesAndShrubs': { 
  //                 'effectivePermeability': float <= 1(.75),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'treeCanopyOverVegetatedGround': { 
  //                 'effectivePermeability': float <= 1(.90),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'treeCanopyOverSealedSurfaces': { 
  //                 'effectivePermeability': float <= 1(.25),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'wetOrDryPondsAndInfiltrationTrenches': { 
  //                 'effectivePermeability': float <= 1(100),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'vegetatedRoof': { 
  //                 'effectivePermeability': float <= 1(.8),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'mainRoof': { 
  //                 'effectivePermeability': float <= 1(0),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'secondaryRoof': { 
  //                 'effectivePermeability': float <= 1(0),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'openDecking': { 
  //                 'effectivePermeability': float <= 1(.75),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'sealedDecking': { 
  //                 'effectivePermeability': float <= 1(0),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'gravel': { 
  //                 'effectivePermeability': float <= 1(.60),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'bareEarth': { 
  //                 'effectivePermeability': float <= 1(.40),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'sealedPavement': { 
  //                 'effectivePermeability': float <= 1(0),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'paversAndBricks': { 
  //                 'effectivePermeability': float <= 1(.5),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //               'permeableAsphalt': { 
  //                 'effectivePermeability': float <= 1(.7),
  //                 'portionParcel': float <= 1,
  //                 'averagePermeability': effectivePermeability * portionParcel
  //               },
  //             }     
  //           },
  //           //Can create an iterative function that creates these values on the fly, replacing them with defaults.
  //           'demandJunctions':{
  //             'toilets': {
  //               // use form to create actual amount of components
  //               'activeToilets': {
  //                 'regUsedToiletA': {
  //                   'flushVolume': int
  //                 },
  //                 'regUsedToiletB': {
  //                   'flushVolume': int
  //                 },
  //                 'infreqUsedToiletA': {
  //                   'flushVolume': int
  //                 },
  //                 'infreqUsedToiletB': {
  //                   'flushVolume': int
  //                 }
  //               },
  //               'numPersonUsingToilets': int,
  //               'dailyPerPersonUsage': int
  //             },
  //             'hygiene': {
  //               'activeShowers': {
  //                 'showerA': {
  //                   'flow': int(liters/min),
  //                 }
  //               },
  //               'typicalShowerDuration': int,
  //               'weeklyShowersPerPerson': int,
  //               'bathVolume': int,
  //               'bathsPerWeek': int,
  //               'minutesOfTapFlowPerVisit': int,
  //               'ablutionDuration': int,
  //               'numOccupantsUsingWashrooms': int,
  //               'numVisitsToWashroomPerOccupant': int
                        
  //             },
  //             'kitchen': {
  //               'quantityOfMealsPerDay': int,
  //               'waterPerMeal': int,
  //               'dishwashingWaterPerLoad': int,
  //               'loadsOfDishesPerDay': int
  //               'waterConsumtionPerMeal': int
  //             },
  //             'laundry': {
  //               //why not just ask how many loads a week
  //               'personsUsingLaundry': int,
  //               'loadsPerWeekPerPerson': int,
  //               'waterConsumptionPerLoad': int

  //             },
  //             'drinking': {
  //               'personsDrinkingWaterOnSite': int,
  //               'avgQuantityOfDrink': int,
  //               'avgDrinksPerDayPerPerson': int
  //             },
  //             // should generate this from weather data dynamically
  //             'landscape': {
  //               'weather': {
  //                 'seasonTotal': int,
  //                 'daysInSeason': int
  //               },
  //               'irrigation': {
  //                 'hoursPerWeek': int,
  //                 'avgFlowRate': int
  //               },
  //               // This doesn't seem finalized
  //               'potsPools': {
  //                 'litersPerLocation': int,
  //                 'numPlantsPools': int
  //               }

  //             },
  //             'surfaceCleaning': {
  //               'freqOfInteriorSurfaceCleaning': int,
  //               'quantityOfWaterUsedForSC': int,
  //               'numTimesVehicleCleaned': int,
  //               'quantityOfWaterUsedForVC': int
  //             },
  //             'evaporativeCooling': {
  //               'hoursPerDayDuringHotSeason': int,
  //               'litersConsumedPerHour': int
  //             },
  //             'waterCustomers': {
  //               'excessCapacityPerDay': int,
  //               'percentageOfExcessDistributed': int,
  //             },
  //             'spa' {}
  //           }

           


  //         },
  //         'connectJunctions': {},
  //         'setLimits': {},
  //         'estimateBypassFlows': {},
  //         'kpi': {
  //           'efficiencyIndicators': {

  //           }
  //         }

  //       }
  //     }

  //   }



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
