import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', price: 9.99 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', price: 12.99 },
    { title: '1984', author: 'George Orwell', category: 'Fiction', price: 10.99 },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', price: 8.99 },
    { title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction', price: 7.99 },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fiction', price: 11.99 },
    { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', category: 'Fiction', price: 14.99 },
    { title: 'The Da Vinci Code', author: 'Dan Brown', category: 'Fiction', price: 13.99 },
    { title: 'The Hunger Games', author: 'Suzanne Collins', category: 'Fiction', price: 10.99 },
    { title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', price: 9.99 },
  ];

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }

  await prisma.user.create({
    data: {
      username: 'testuser',
      password: 'password123',
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });