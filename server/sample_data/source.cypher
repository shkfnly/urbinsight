
LOAD CSV WITH HEADERS FROM "file:/Users/addisonlee/Development/urbinsight/server/sample_data/source.csv" AS csvLine
CREATE (:source:vancouver {     geodb_subt: csvLine.GEODB_SUBT,
                    geodb_oid: csvLine.GEODB_OID,
                    object_id: csvLine.OBJECTID,
                    type: csvLine.TYPE,
                    name: csvLine.NAME,
                    global_id: csvLine.GLOBALID,
                    lat: csvLine.YCOORD,
                    lng: csvLine.XCOORD,
                    city: 'vancouver'
                    });
