import React, { Component } from "react";

// components
import Contact from "./components/Contact";
import Header from "./components/Header";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Contact name="John" email="adwadad@gmasd.com" phone="234543246" />
        <Contact name="Karen" email="qweweqweqwe@gmasd.com" phone="54545544" />
      </div>
    );
  }
}

export default App;
