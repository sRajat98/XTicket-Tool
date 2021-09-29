import React from "react";

const Loader = (props) => {
  return (
    <>
      <div
        className="LoaderBalls"
        style={props.margintTop ? { marginTop: props.margintTop } : null}
      >
        <div className="LoaderBalls__item"></div>
        <div className="LoaderBalls__item"></div>
        <div className="LoaderBalls__item"></div>
      </div>
    </>
  );
};

export default Loader;
