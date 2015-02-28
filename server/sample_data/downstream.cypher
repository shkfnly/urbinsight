
LOAD CSV WITH HEADERS FROM "file:/Users/addisonlee/Development/urbinsight/server/sample_data/downstream.csv" AS csvLine
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
