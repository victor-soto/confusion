import React, { Component } from 'react'
import Home from './HomeComponent'
import About from './AboutComponent'
import Menu from './MenuComponent'
import Contact from './ContactComponent'
import DishDetail from './DishdetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

  constructor() {
    super()
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId })
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.find(dish => dish.featured)}
          promotion={this.props.promotions.find(promotion => promotion.featured)}
          leader={this.props.leaders.find(leader => leader.featured)} />
      )
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={this.props.dishes.find(dish => dish.id === parseInt(match.params.dishId, 10))}
          comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId), 10)}
        />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/about-us' component={() => <About leaders={this.props.leaders} />} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contact-us' component={Contact} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Main))
