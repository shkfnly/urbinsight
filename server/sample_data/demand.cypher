LOAD CSV WITH HEADERS FROM "file:/Users/ashokafinley/development/urbinsight/server/sample_data/demand.csv" AS csvLine
CREATE (:demand:vancouver {     db_link: csvLine.DBLINK,
                    geodb_oid: csvLine.GEODB_OID,
                    object_id: csvLine.OBJECTID,
                    met_input: csvLine.MET_INPUT,
                    met_tech: csvLine.MET_TECH,
                    cogo: csvLine.COGO,
                    lat: csvLine.YCOORD,
                    lng: csvLine.XCOORD,
                    city: 'vancouver'
                    });


LOAD CSV WITH HEADERS FROM "file:/Users/ashokafinley/development/urbinsight/server/sample_data/downstream.csv" AS csvLine
CREATE (:downstream:vancouver { geodb_subt: csvLine.GEODB_SUBT,
                    geodb_oid: csvLine.GEODB_OID,
                    object_id: csvLine.OBJECTID,
                    asset_id: csvLine.ASSET_ID,
                    am_owner: csvLine.AM_OWNER,
                    am_owner_r: csvLine.AM_OWNER_R,
                    am_dept: csvLine.AM_DEPT,
                    am_dept_re: csvLine.AM_DEPT_RE,
                    am_date: csvLine.AM_DATE,
                    am_type: csvLine.AM_TYPE,
                    draw_type: csvLine.DRAW_TYPE,
                    inv_elev: csvLine.INV_ELEV,
                    lift_name: csvLine.LIFT_NAME,
                    lift_id: csvLine.LIFT_ID,
                    met_input: csvLine.MET_INPUT,
                    met_tech: csvLine.MET_TECH,
                    enabled: csvLine.ENABLED,
                    enabled_re: csvLine.ENABLED_RE,
                    ancillaryr: csvLine.ANCILLARYR,
                    ancillar00: csvLine.ANCILLAR00,
                    global_id: csvLine.GLOBALID,
                    lat: csvLine.YCOORD,
                    lng: csvLine.XCOORD,
                    city: 'vancouver'

                    });


LOAD CSV WITH HEADERS FROM "file:/Users/ashokafinley/development/urbinsight/server/sample_data/sink.csv" AS csvLine
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

LOAD CSV WITH HEADERS FROM "file:/Users/ashokafinley/development/urbinsight/server/sample_data/source.csv" AS csvLine
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


LOAD CSV WITH HEADERS FROM "file:/Users/ashokafinley/development/urbinsight/server/sample_data/upstream.csv" AS csvLine
CREATE (:upstream:vancouver { geodb_subt: csvLine.GEODB_SUBT,
                    geodb_oid: csvLine.GEODB_OID,
                    object_id: csvLine.OBJECTID,
                    asset_id: csvLine.ASSET_ID,
                    am_owner: csvLine.AM_OWNER,
                    am_owner_r: csvLine.AM_OWNER_R,
                    am_dept: csvLine.AM_DEPT,
                    am_dept_re: csvLine.AM_DEPT_RE,
                    am_date: csvLine.AM_DATE,
                    am_materia: csvLine.AM_MATERIA,
                    am_size: csvLine.AM_SIZE,
                    am_type: csvLine.AM_TYPE,
                    am_estimat: csvLine.AM_ESTIMAT,
                    draw_type: csvLine.DRAW_TYPE,
                    bldg_id: csvLine.BLDG_ID,
                    facility_n: csvLine.FACILITY_N,
                    facility_i: csvLine.FACILITY_I,
                    met_input: csvLine.MET_INPUT,
                    met_tech: csvLine.MET_TECH,
                    enabled: csvLine.ENABLED,
                    enabled_re: csvLine.ENABLED_RE,
                    ancillaryr: csvLine.ANCILLARYR,
                    ancillar00: csvLine.ANCILLAR00,
                    global_id: csvLine.GLOBALID,
                    lat: csvLine.YCOORD,
                    lng: csvLine.XCOORD,
                    city: 'vancouver'

                    });
