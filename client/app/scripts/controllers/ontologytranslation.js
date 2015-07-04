// write getters and setters for this model.


// var Parcel = {
//   'author': string,
//   'date': date(CalendarYear),
//   'neighborhoodID': int(dropdown),
//   // 'subsystem': string(dropdown),
//   'timeHorizon': int(CalendarYear),
//   'describeParcel': {

//     'parcelIndetification': { 'parcelType': string(dropdown),
//                               'designatedLandUse': string(dropdown),
//                               'actualLandUse': string(dropdown),
//                               'geoCoordinates': [Lat, Lng],
//                               'landArea': int(square meters),
//                               'buildingFootprint': int(square meters)},
//     'buildingData': { 'buildingAttachmentType': string(dropdown),
//                       'numberOccupiedDwellingUnits': int,
//                       'buildingAge': int(years),
//                       'aboveGroundStories': int(stories),
//                       'belowGroundStories': int(stories),
//                       'interiorFloorSpace': int(square meters),
//                       'separateDwellingUnits': int,
//                       'foundationType': string(dropdown),
//                       'wallType': string,
//                       'roofType': string },
//     'demographics': {
//       'seniors': {
//         'livingWorking': int,
//         'livingOffWorking': int,
//         'visitingWork': int,
//         'visitingPartTimeWork': int
//       },
//       'adults': {
//         'livingWorking': int,
//         'livingOffWorking': int,
//         'visitingWork': int,
//         'visitingPartTimeWork': int
//       },
//       'youth': {
//         'livingWorking': int,
//         'livingOffWorking': int,
//         'visitingWork': int,
//         'visitingPartTimeWork': int
//       }
//     }                              
//   },










//   'workbooks' : {
//     'water': {
//       'estimateDemand': {
//         'landCoverPreCalculation': {
//           'percentageOfParcelWithRainwaterCatchment': percentage,
//           'surfaceTypes': {
//             'turf(green)': { 
//               'effectivePermeability': float <= 1(.50),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'perennialGrassesAndShrubs': { 
//               'effectivePermeability': float <= 1(.75),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'treeCanopyOverVegetatedGround': { 
//               'effectivePermeability': float <= 1(.90),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'treeCanopyOverSealedSurfaces': { 
//               'effectivePermeability': float <= 1(.25),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'wetOrDryPondsAndInfiltrationTrenches': { 
//               'effectivePermeability': float <= 1(100),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'vegetatedRoof': { 
//               'effectivePermeability': float <= 1(.8),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'mainRoof': { 
//               'effectivePermeability': float <= 1(0),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'secondaryRoof': { 
//               'effectivePermeability': float <= 1(0),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'openDecking': { 
//               'effectivePermeability': float <= 1(.75),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'sealedDecking': { 
//               'effectivePermeability': float <= 1(0),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'gravel': { 
//               'effectivePermeability': float <= 1(.60),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'bareEarth': { 
//               'effectivePermeability': float <= 1(.40),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'sealedPavement': { 
//               'effectivePermeability': float <= 1(0),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'paversAndBricks': { 
//               'effectivePermeability': float <= 1(.5),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//             'permeableAsphalt': { 
//               'effectivePermeability': float <= 1(.7),
//               'portionParcel': float <= 1,
//               'averagePermeability': effectivePermeability * portionParcel
//             },
//           }     
//         },
//         //Can create an iterative function that creates these values on the fly, replacing them with defaults.
//         'demandJunctions':{
//           'toilets': {
//             // use form to create actual amount of components
//             'activeToilets': {
//               'regUsedToiletA': {
//                 'flushVolume': int
//               },
//               'regUsedToiletB': {
//                 'flushVolume': int
//               },
//               'infreqUsedToiletA': {
//                 'flushVolume': int
//               },
//               'infreqUsedToiletB': {
//                 'flushVolume': int
//               }
//             },
//             'numPersonUsingToilets': int,
//             'dailyPerPersonUsage': int
//           },
//           'hygiene': {
//             'activeShowers': {
//               'showerA': {
//                 'flow': int(liters/min),
//               }
//             },
//             'typicalShowerDuration': int,
//             'weeklyShowersPerPerson': int,
//             'bathVolume': int,
//             'bathsPerWeek': int,
//             'minutesOfTapFlowPerVisit': int,
//             'ablutionDuration': int,
//             'numOccupantsUsingWashrooms': int,
//             'numVisitsToWashroomPerOccupant': int
                    
//           },
//           'kitchen': {
//             'quantityOfMealsPerDay': int,
//             'waterPerMeal': int,
//             'dishwashingWaterPerLoad': int,
//             'loadsOfDishesPerDay': int
//             'waterConsumtionPerMeal': int
//           },
//           'laundry': {
//             //why not just ask how many loads a week
//             'personsUsingLaundry': int,
//             'loadsPerWeekPerPerson': int,
//             'waterConsumptionPerLoad': int

//           },
//           'drinking': {
//             'personsDrinkingWaterOnSite': int,
//             'avgQuantityOfDrink': int,
//             'avgDrinksPerDayPerPerson': int
//           },
//           // should generate this from weather data dynamically
//           'landscape': {
//             'weather': {
//               'seasonTotal': int,
//               'daysInSeason': int
//             },
//             'irrigation': {
//               'hoursPerWeek': int,
//               'avgFlowRate': int
//             },
//             // This doesn't seem finalized
//             'potsPools': {
//               'litersPerLocation': int,
//               'numPlantsPools': int
//             }

//           },
//           'surfaceCleaning': {
//             'freqOfInteriorSurfaceCleaning': int,
//             'quantityOfWaterUsedForSC': int,
//             'numTimesVehicleCleaned': int,
//             'quantityOfWaterUsedForVC': int
//           },
//           'evaporativeCooling': {
//             'hoursPerDayDuringHotSeason': int,
//             'litersConsumedPerHour': int
//           },
//           'waterCustomers': {
//             'excessCapacityPerDay': int,
//             'percentageOfExcessDistributed': int,
//           },
//           'spa' {}
//         }

       


//       },
//       'connectJunctions': {},
//       'setLimits': {},
//       'estimateBypassFlows': {},
//       'kpi': {
//         'efficiencyIndicators': {

//         }
//       }

//     }
//   }

// }

// kpi.efficiencyIndicators
// // take the different things in the defaults and and add geoInfo + citations and then attach to wo
//   'describeJunction': {},
// //this is a defaults object arranged by type for jundctions and such.


// UMIS.DEFAULTS.Water = {
//     stagesAndJunctions: {
//       'source': ['Direct Precipitation',  
//                  'Ponds', 
//                  'Ice and Snow Melt', 
//                  'Rivers', 'Lakes', 
//                  'Mountain Spring', 
//                  'Sweetwater Ground', 
//                  'Rural Acquifer South', 
//                  'Imported Raw', 
//                  'Imported in Bottles' ],
//       'upstream': ['Purification System', 
//                    'Well and Pump', 
//                    'Mixing System', 
//                    'City Water Factory', 
//                    'Local Water Factory', 
//                    'Local Storage Tank', 
//                    'Roof Catchment & Tank', 
//                    'Pumping Stations', 
//                    'Storage Reservoir', 
//                    'Hot Spring Conditioning'],
//       'demand': ['Toilets', 
//                  'Hygiene', 
//                  'Kitchen', 
//                  'Laundry', 
//                  'Drinking', 
//                  'Landscape', 
//                  'Surface Cleaning', 
//                  'Evaporative Cooling', 
//                  'Water Customers', 
//                  'Spa'],
//       'downstream': ['City Wastewater Treatment', 
//                      'Local WWTP', 
//                      'On-site Greywater System(s)', 
//                      'Reclamation Plant', 
//                      'Constructed Wetland(s)', 
//                      'Infiltration System', 
//                      'Detention Pond(s)', 
//                      'Storm Water Drains', 
//                      'Septic Tank(s) & Field', 
//                      'Advanced Secondary On-site'],
//       'sink': ['Lakes & Ponds', 
//                'Downstream Rivers', 
//                'Upstream Rivers', 
//                'Ground', 
//                'Air', 
//                'Acquifer(Recharge)', 
//                'Farmland', 
//                'Exported Raw', 
//                'Exported Bottles', 
//                'Catch All Others']
//     }
//   }

// // this would end up as a color object that would be attached to the workbook after it is generated
// 'defineAnatomy': {
//   'diagramBackground': hexcolor,
//   'stages': {
//     'source': hyperlink,
//     'upstream': hyperlink,
//     'demand': hyperlink,
//     'downstream': hyperlink,
//     'sink'
//   }
// }


// // function related to workbook calculations









// Get the Geographic boundaries of map
// Iterate and Sum through the nodes accessing the properties.
// }