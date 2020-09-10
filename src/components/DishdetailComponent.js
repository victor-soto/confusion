import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

class Dishdetail extends Component {

  renderDish(dish) {
    if (dish)
      return (
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
            <Card>
              <CardImg width='100%' src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
            {this.renderComments(dish.comments)}
          </div>
        </div>
      )
    return <div></div>
  }

  renderComments(comments) {
    if (!comments) return <div></div>

    const commentItems = comments.map((commentItem) => {
      return (
        <li key={commentItem.id}>
          <p>{commentItem.comment}</p>
          <p>-- {commentItem.author} {commentItem.date}</p>
        </li>
      )
    })

    return (
      <div>
        <h4>Comments</h4>
        <ul className='list-unstyled'>
          {commentItems}
        </ul>
      </div>
    )
  }

  render() {
    const { dish } = this.props

    return this.renderDish(dish)
  }
}

export default Dishdetail
