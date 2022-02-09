import knexfile from "../../knexfile";
import  knex from "knex"(knexfile.development);

module.exports = knex();