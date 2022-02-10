import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function(table){
        table.increments('id')

        table.text('userName').notNullable()
        table.text('email').unique().notNullable()
        table.text('password').notNullable()
        table.boolean('provider').defaultTo(false)

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    })
}




export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

