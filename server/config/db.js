// Database setup

module.exports = {
  db : require("seraph")({ server: process.env['GRAPHENEDB_URL'] || 'http://localhost:7474'})
}