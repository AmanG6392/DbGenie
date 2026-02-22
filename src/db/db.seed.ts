import { db } from './db';
import { productsTable, salesTable } from './schema';

export async function seed() {
  console.log('seeding database...');

  // 1️⃣ Delete child → parent
  await db.delete(salesTable);
  await db.delete(productsTable);

  // 2️⃣ Insert products AND GET REAL IDS
  const insertedProducts = await db
    .insert(productsTable)
    .values([
      { name: 'Laptop', category: 'Electronics', price: 999.99, stock: 50 },
      { name: 'Mouse', category: 'Electronics', price: 25.99, stock: 200 },
      { name: 'Keyboard', category: 'Electronics', price: 75, stock: 150 },
      { name: 'Monitor', category: 'Electronics', price: 299.99, stock: 70 },
      { name: 'Desk Chair', category: 'Furniture', price: 199.99, stock: 40 },
      { name: 'Desk', category: 'Furniture', price: 399.99, stock: 30 },
      { name: 'Notebook', category: 'Stationary', price: 5.99, stock: 500 },
      { name: 'Pen Set', category: 'Stationary', price: 12.99, stock: 300 },
    ])
    .returning();

  // 3️⃣ Map product names → real IDs
  const productId = {
    laptop: insertedProducts.find(p => p.name === 'Laptop')!.id,
    mouse: insertedProducts.find(p => p.name === 'Mouse')!.id,
    keyboard: insertedProducts.find(p => p.name === 'Keyboard')!.id,
    monitor: insertedProducts.find(p => p.name === 'Monitor')!.id,
    deskChair: insertedProducts.find(p => p.name === 'Desk Chair')!.id,
    desk: insertedProducts.find(p => p.name === 'Desk')!.id,
    notebook: insertedProducts.find(p => p.name === 'Notebook')!.id,
    penSet: insertedProducts.find(p => p.name === 'Pen Set')!.id,
  };

  // 4️⃣ Insert sales using REAL product IDs
  await db.insert(salesTable).values([
    {
      product_id: productId.laptop,
      quantity: 2,
      total_amount: 1999.98,
      customer_name: 'John Doe',
      region: 'North',
    },
    {
      product_id: productId.mouse,
      quantity: 5,
      total_amount: 129.95,
      customer_name: 'Jahn Smith',
      region: 'South',
    },
    {
      product_id: productId.keyboard,
      quantity: 3,
      total_amount: 225.0,
      customer_name: 'Alice Brown',
      region: 'West',
    },
    {
      product_id: productId.monitor,
      quantity: 2,
      total_amount: 599.98,
      customer_name: 'Charlie Wilson',
      region: 'North',
    },
    {
      product_id: productId.deskChair,
      quantity: 7,
      total_amount: 799.98,
      customer_name: 'Diana Davis',
      region: 'South',
    },
    {
      product_id: productId.desk,
      quantity: 7,
      total_amount: 799.98,
      customer_name: 'Eve Martinez',
      region: 'East',
    },
    {
      product_id: productId.notebook,
      quantity: 20,
      total_amount: 199.8,
      customer_name: 'Frank Lee',
      region: 'West',
    },
    {
      product_id: productId.penSet,
      quantity: 10,
      total_amount: 129.9,
      customer_name: 'Grace Kim',
      region: 'North',
    },
  ]);

  console.log('Database seeded successfully ✅');
}

seed();
