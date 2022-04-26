import React from 'react'
import './Footer.css';
import Buy from './buy';
import Sell from './sell';
import Rent from './rent';

export default function () {
  return (
    <div className = "footer">
       <div className="wrapper">
          <div className="buy">
            <div className="image">
              <Buy />
            </div>
            <div className="info">
              <h3>Buy a home</h3>
              <p>Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</p>
              <div className="link-btn">
                Search property
              </div>
            </div>
          </div>
          <div className="sell">
            <div className="image">
              <Sell />
            </div>
            <div className="info">
              <h3>Sell your home</h3>
              <p>Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</p>
              <div className="link-btn">
                Sell property
              </div>
            </div>
          </div>
          <div className="rent">
            <div className="image">
              <Rent />
            </div>
            <div className="info">
              <h3>Rent a house</h3>
              <p>Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</p>
              <div className="link-btn">
                Rent house
              </div>
            </div>
          </div>
       </div>
    </div>
  )
}
