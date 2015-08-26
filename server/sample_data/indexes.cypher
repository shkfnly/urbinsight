CREATE INDEX ON :source(name);
CREATE INDEX ON :source(geodb_oid);

CREATE INDEX ON :upstream(geodb_oid);
CREATE INDEX ON :upstream(geodb_subt);
CREATE INDEX ON :upstream(facility_n);

CREATE INDEX ON :demand(geodb_oid);

CREATE INDEX ON :downstream(geodb_oid);
CREATE INDEX ON :downstream(geodb_subt);
CREATE INDEX ON :downstream(lift_name);

CREATE INDEX ON :sink(geodb_oid);
CREATE INDEX ON :sink(geodb_sub);
CREATE INDEX ON :sink(lift_name);