const fetch = require('node-fetch')
const connection = require('../config/connection')
//Node looks for the index.js automatically so we don't need to specify it.
const { User, Book } = require('../models')

connection.once('open', async () => {
    //Delete the existing data
    await User.deleteMany()
    await Book.deleteMany()

       // Seed the books
       for (const id of ["romance of the three kingdoms", "treasure island", "a game of thrones"]) {
        const response = await fetch(`https://openlibrary.org/search.json?q=${id}`);
        const data = await response.json();

        if (data.docs && data.docs.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.docs.length)
            const { 
                title, 
                author_name, 
                cover_i, 
                first_publish_year 
            } = data.docs[randomIndex]

            await Book.create({
                title,
                author_name,
                cover_i,
                first_publish_year
            })
        } else {
            console.log(`No data found for book: ${id}`)
        }

        
    }

    //seed the user
    const allBook = await Book.find()
    const allBookIds = allBook.map(book => book._id)

    await User.create({
        username: 'avidreader',
        email: 'ILoveBooks@gmail.com',
        password: 'BooksAreTheBest',
        book: allBookIds
    })

    console.log('Library is now open.');
    process.exit(0);
});