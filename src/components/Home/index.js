import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <Link to="/" className="home-container">
      <Header />
      <div className="home-content-container">
        <div className="home-content">
          <h1 className="home-content-heading">Clothes That Get You Noticed</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png "
            className="clothes-image-mobile"
            alt="clothes that get you noticed"
          />
          <p className="home-content-para">
            Fashion is part of the daily air and it does not quite help that it
            changer all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png "
          className="clothes-image"
          alt="clothes that get you noticed"
        />
      </div>
    </Link>
  )
}

export default Home
