import React from "react";
import { useNavigate } from "react-router-dom";

function withNavigate(Component) {
  function ComponentWithNavigationProp(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }

  return ComponentWithNavigationProp;
}

export default withNavigate;
