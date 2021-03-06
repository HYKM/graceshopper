import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {editABook} from '../store/singleBook'

export class UpdateBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.book.title,
      price: this.props.book.price / 100,
      qty: this.props.book.qty
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.book.title = this.state.title
    this.props.book.price = this.state.price * 100
    this.props.update(this.props.book)
    this.setState({
      title: '',
      price: 0,
      qty: 0
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">New Title</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label htmlFor="price">New Price</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            name="qty"
            value={this.state.qty}
            onChange={this.handleChange}
          />
          <button type="submit" className="minusplus">
            Update
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: bookObj => dispatch(editABook(bookObj))
  }
}
export default connect(null, mapDispatchToProps)(UpdateBook)
