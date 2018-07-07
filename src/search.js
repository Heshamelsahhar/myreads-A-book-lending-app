    import React , { Component } from 'react'
    import escapeRegExp from 'escape-string-regexp';
    import {Link} from'react-router-dom'
    import { search } from './BooksAPI';
    import Book from './Book'
    class Search extends Component {
    state = {
        query :'',
        books:[] , 
    }
    updateQuery = (ev) => {
        this.setState({query : ev.target.value});
        if (ev.target.value) {
             search(ev.target.value,20).then(booksearch => {
             booksearch.length >=1 ?  this.setState({books : booksearch}) : this.setState({books:[]});
         }
         );}
         else this.setState({books:[]});
    }
    changeShelf = (newShelf,book) => {
        this.props.changeShelf(newShelf,book);
    }

    

    render(){
      
    return (
    <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.updateQuery} />

            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
            {
            this.state.books.map( 
            book => {  
                let shel='none';
                if (this.props.read.filter((boo)=>book.id===boo.id).length)shel='read';
                if (this.props.curr.filter((boo)=>book.id===boo.id).length)shel='currentlyReading';
                if (this.props.want.filter((boo)=>book.id===boo.id).length)shel='wantToRead';
                return <li key={book.id}> <Book book={book} shelf={shel} changeShelf={this.changeShelf} /> </li>;
            
            })
            }
            
            </ol>
        </div>
    </div>)


    }

    }


    export default Search