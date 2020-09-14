import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'
import { Link } from 'react-router-dom'

function RenderDish({ dish }) {
  if (dish)
    return (
      <Card>
        <CardImg width='100%' src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  return <div></div>
}

function RenderComments({ comments }) {
  if (!comments) return <div></div>

  const commentItems = comments.map((commentItem) => {
    return (
      <li key={commentItem.id}>
        <p>{commentItem.comment}</p>
        <p>-- {commentItem.author}, {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }).format(new Date(Date.parse(commentItem.date)))}</p>
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

const DishDetail = (props) => {

  if (!props.dish) return <div></div>

  return (
    <div className='container'>
      <div className='row'>
        <Breadcrumb>
           <BreadcrumbItem>
            <Link to='/menu'>Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {props.dish.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <div className='col-12'>
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
          <RenderDish dish={props.dish} />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
}


export default DishDetail
