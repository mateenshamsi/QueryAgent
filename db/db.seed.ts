import {productTable,salesTable} from "./schema";
import {db} from "./db";
export async function seed() {
    await db.insert(productTable).values([
        {
            name: "Laptop",
            category: "Electronics",
            price: 999.99,
            stock: 50,

        },
        {
            name: "Smartphone",
            category: "Electronics",
            price: 699.99,  
            stock: 100,

        },
        {
            name: "Desk Chair",
            category: "Furniture",
            price: 89.99,
            stock: 200,
        }
    ])
    await db.insert(salesTable).values([
        {
            productId: 1,   
            quantity: 2,
            total_amount: 1999.98,
            saleDate: "2024-01-15",
            cuser_name: "alice",
        },
        {       
            productId: 2,
            quantity: 1,
            total_amount: 699.99,
            saleDate: "2024-01-16",
            cuser_name: "bob",
        },
        {   
            productId: 3,
            quantity: 4,
            total_amount: 359.96,
            saleDate: "2024-01-17",
            cuser_name: "charlie",
        }
    ])
}
