import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom';
class BooksApp extends React.Component {
  state = {
    wantToRead:[],
    read:[],
    currentlyReading:[]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let curr = books.filter( book => 
        book.shelf === 'currentlyReading'
      )
      let read = books.filter( book => 
        book.shelf === 'read'
      )
      let tread = books.filter( book => 
        book.shelf === 'wantToRead'
      )
      return this.setState({
        'wantToRead': tread,
        'read': read,
        'currentlyReading': curr
      });
    
    })
  };

  changeShelf = (newShelf,old, bookId) => 
  {
    console.log(newShelf,old);
    let book = this.state[old].filter( (book) => book.id === bookId );
    let rem = this.state[old].filter( (book) => book.id !== bookId );
    book[0].shelf = newShelf;
    if (old !== newShelf )
    {this.setState({[old]:rem});BooksAPI.update(book[0],newShelf);}
    if (newShelf !== old && newShelf !=='none' )
    this.setState( (oldstate)=> (
      
        {[newShelf]: oldstate[newShelf].concat(book)}
      
    ));

    

  }
 
  
    
  
  render() {
    return (
  <div className="app">
      <Route path='/search' render={({his}) => 
    
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search"/>
              <div className="search-books-input-wrapper">
                {
                  
                }
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
      } /> 
      
      
      <Route exact path='/' render={()=>
          <div>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <ListBooks type='currentlyReading' typeShown='Currently Reading' books = {this.state.currentlyReading} changeShelf={this.changeShelf} />
                  <ListBooks type='wantToRead' typeShown='Want To Read' books = {this.state.wantToRead} changeShelf={this.changeShelf}/>
                  <ListBooks type='read' typeShown='read' books = {this.state.read} changeShelf={this.changeShelf} />
                </div>
                <div className="open-search">
                  <Link to='/search'/>
                </div>
            </div>
          </div>
      
    }/>
  </div>
  )}
    
  
}

export default BooksApp
