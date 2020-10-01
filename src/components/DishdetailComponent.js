import React, { useState } from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from 'reactstrap'
import {
  LocalForm,
  Control,
  Errors
} from 'react-redux-form'
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

const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

const DishDetail = (props) => {

  const { className } = props
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const handleSubmit = (values) => {
    console.log('Current state is: ', JSON.stringify(values))
    alert('Current state is: ' + JSON.stringify(values))
  }

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
          <Button type='button' outline color='secondary' onClick={toggle}>
            <span className='fa fa-pencil'></span> Submit Comment
          </Button>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <LocalForm onSubmit={(values) => handleSubmit(values)}>
          <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <Label htmlFor='rating'>Rating</Label>
              <Control.select
                name='rating'
                type='select'
                model='.rating'
                className='form-control'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
            </div>
            <div className='form-group'>
              <Label htmlFor='yourName'>Your Name</Label>
              <Control.text
                name='yourName'
                model='.yourName'
                type='text'
                id='yourName'
                className='form-control'
                validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                placeholder='Your Name' />
              <Errors
                className='text-danger'
                model='.yourName'
                show='touched'
                messages={{
                  required: 'Required',
                  minLength: 'Must be greater than 2 characters',
                  maxLength: 'Must be 15 characters or less'
                }} />
            </div>
            <div className='form-group'>
              <Label htmlFor='comment'>Comment</Label>
              <Control.textarea
                name='comment'
                model='.comment'
                id='comment'
                className='form-control'
                rows='6' />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' color="primary" className='mr-auto'>Submit</Button>
          </ModalFooter>
        </LocalForm>
      </Modal>
    </div>
  );
}


export default DishDetail
