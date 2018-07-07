import React, {Component } from 'react';
import Book from './Book.js'


class ListBooks extends Component {

changeShelf = (newShelf,old,bookId) => {
    this.props.changeShelf(newShelf,old,bookId);
}
render()
{
    return (
        
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.typeShown}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                { this.props.books.map( 
                    
                (book) => { return <li key={book.id}> <Book book={book} shelf={this.props.type} changeShelf={this.changeShelf} /> </li> }
                
                ) }
                </ol>
              </div>
            </div>
      </div>
    )


}


}



export default ListBooks;