LOAD CSV WITH HEADERS FROM "file:/Users/ashokafinley/development/idhack/data/demand.csv" AS csvLine
CREATE (:Demand {     db_link: csvLine.DBLINK,
                    geodb_oid: csvLine.GEODB_OID,
                    object_id: csvLine.OBJECTID,
                    met_input: csvLine.MET_INPUT,
                    met_tech: csvLine.MET_TECH,
                    cogo: csvLine.COGO,
                    lat: csvLine.YCOORD,
                    lng: csvLine.XCOORD
                    });
