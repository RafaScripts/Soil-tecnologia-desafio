import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { userName: "rafael", email: "rafael@gmail.com", password: "123456", provider: "true" },
        { userName: "jake", email: "jake@gmail.com", password: "123456" },
        { userName: "igor", email: "igor@gmail.com", password: "123456" }
    ]);
};
