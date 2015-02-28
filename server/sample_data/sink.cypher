
LOAD CSV WITH HEADERS FROM "file:/Users/addisonlee/Development/urbinsight/server/sample_data/sink.csv" AS csvLine
CREATE (:sink:vancouver { geodb_subt: csvLine.GEODB_SUBT,
                    geodb_oid: csvLine.GEODB_OID,
                    object_id: csvLine.OBJECTID,
                    type: csvLine.TYPE,
                    lift_name: csvLine.LIFT_NAME,
                    lift_id: csvLine.LIFT_ID,
                    met_input: csvLine.MET_INPUT,
                    met_tech: csvLine.MET_TECH,
                    global_id: csvLine.GLOBALID,
                    lat: csvLine.YCOORD,
                    lng: csvLine.XCOORD,
                    shape_area: csvLine.SHAPE_AREA,
                    shape_len: csvLine.SHAPE_LEN,
                    city: 'vancouver'
                    });
