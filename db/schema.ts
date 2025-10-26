import { sql } from "drizzle-orm";
import { integer, real, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const productTable = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const salesTable = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id")  
    .notNull(),
    quantity: integer("quantity").notNull(),
    total_amount: real("total_amount").notNull(),
    saleDate: text("sale_date"),
    cuser_name: text("cuser_name").notNull(),
    createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});