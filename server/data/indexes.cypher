CREATE INDEX ON :Source(name);
CREATE INDEX ON :Source(geodb_oid);

CREATE INDEX ON :Upstream(geodb_oid);
CREATE INDEX ON :Upstream(geodb_subt);
CREATE INDEX ON :Upstream(facility_n);

CREATE INDEX ON :Demand(geodb_oid);

CREATE INDEX ON :Downstream(geodb_oid);
CREATE INDEX ON :Downstream(geodb_subt);
CREATE INDEX ON :Downstream(lift_name);

CREATE INDEX ON :Sink(geodb_oid);
CREATE INDEX ON :Sink(geodb_sub);
CREATE INDEX ON :Sink(lift_name);