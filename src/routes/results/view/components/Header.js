import React from 'react';

export const Header = props => (
  <div className="navbar navbar-default navbar-fixed-top teal">
      <div className="container">
        <div className="navbar-header">
          <a href="../" className="navbar-brand">Destination Density</a>
        </div>
        <div className="navbar-collapse collapse" id="navbar-main">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Get Tweets</a></li>
          </ul>
        </div>
      </div>
    </div>
);
