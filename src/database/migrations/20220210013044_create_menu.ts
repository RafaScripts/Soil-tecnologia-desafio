import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('menu', function(table){
        table.increments('id')

        table.text('week').notNullable()
        table.text('time').notNullable()
        table.text('protein').notNullable()
        table.text('carb').notNullable()
        table.text('vegetal').notNullable()
        table.text('greens').notNullable()
        table.text('fruits').notNullable()

        table.integer('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('menu');
}

