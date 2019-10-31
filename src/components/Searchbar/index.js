import React from 'react';
import axios from 'axios';

class Searchbar extends React.Component {
    state = {
        title: "",
        books: [],
    }
    handleInputChange = event => {
        console.log(event.target.value)
        this.setState({
            title: event.target.value,
        })
    }
    handleSearch = event => {
        console.log("looking for books")
        console.log(this.state.title)
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}`)
        .then(data => {
            console.log(data)
            this.setState({
                books: data.data.items,
            })
        })
    }
    handleSave = event => {
        console.log("saving book")
        axios.post('/api/books',{
            title: "my book"
        })
    }

    renderBooks = () => {
        return this.state.books.map(book =>
            <div>
            <div>{book.volumeInfo.title}</div>
            <div>{book.volumeInfo.authors[0]}</div>
            <div>{book.volumeInfo.description}</div>
            <img src = {book.volumeInfo.imageLinks.thumbnail} />
            <div>{book.volumeInfo.previewLink}</div>
            <button onClick = {this.handleSave}>Save Book</button>
            </div>
            )
    }
    render() {
        return (
            <div>
                <input placeholder = "search by title" onChange = {this.handleInputChange}/>
                <button onClick = {this.handleSearch}>Search</button>
                {this.state.books.length && this.renderBooks()}
            </div>
        )
    }
}
export default Searchbar;