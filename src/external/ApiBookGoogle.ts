import axios from "axios";

class ApiBookGoogle {

    async findBook(title: string) {

        const books = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
            params: {
                q: title,
                //inauthor: 'keyes',
                maxResults: 30,
                //subject: 'Gardening',
                key: process.env.API_GOOGLE_KEY
            }
        });


        return books

    }

}

export default ApiBookGoogle