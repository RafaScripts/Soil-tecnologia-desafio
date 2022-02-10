import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("menu").del();

    // Inserts seed entries
    await knex("menu").insert([
        {
            user_id: 1,
            week: "1",
            time: "almoço",
            protein: "Carne vermelha: 200g",
            carb: "Arroz integral: 1/2 xicara",
            vegetal: "rucula: 80g",
            greens: "batata: 50g",
            fruits: "2 maças ou 3 bananas"
        }

    ]);
};
