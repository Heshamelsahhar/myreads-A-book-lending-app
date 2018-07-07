    import React, {Component} from 'react'



    class Book extends Component {

    state = {
        selected: this.props.shelf
    }
    changeShelf = ev => {
        if (this.props.shelf !== 'none'){
        this.props.changeShelf(ev.target.value, this.props.shelf, this.props.book.id);
        this.setState({ selected: ev.target.value});
        }
        else {
            this.props.changeShelf(ev.target.value,this.props.book);
            this.setState({ selected: ev.target.value});
        }
    };
    render() {
        //console.log(this.props.book.shelf);
        const cover = this.props.book.imageLinks && this.props.book.imageLinks.thumbnail ?  this.props.book.imageLinks.thumbnail : 'no';
        const author = this.props.book.authors ? this.props.book.authors : 'not found';
        const title = this.props.book.title ? this.props.book.title : 'not found';

        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange = {this.changeShelf} value={this.state.selected} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>
        )
    }

    }

    export default Book