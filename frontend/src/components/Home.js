import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home-outer">
      <h1>Having trouble remembering everything?</h1>
      <p>Here is a little help</p>{" "}
      <div className="box">
        <Link className="create" to="/signup">
          Create a Keeper List
        </Link>
      </div>
    </div>
  );
}

export default Home;
