import React from "react";
import PropTypes from "prop-types";

const Helmet = ({ children, title }) => {
  document.title = "Yolo - " + title;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{children}</div>;
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
