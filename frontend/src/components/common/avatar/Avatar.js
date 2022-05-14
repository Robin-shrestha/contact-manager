import classNames from "classnames";
import React, { useEffect, useState } from "react";

import "./style.css";

const Avatar = ({ src, name }) => {
  const [dimensions, setDimensions] = useState({});
  console.log(
    "🚀 ~ file: Avatar.js ~ line 7 ~ Avatar ~ dimensions",
    dimensions
  );

  function getMeta(url) {
    const img = new Image();
    img.addEventListener("load", function () {
      setDimensions({
        width: this.naturalWidth,
        height: this.naturalHeight,
      });
    });
    img.src = url;
  }

  useEffect(() => {
    if (src) {
      getMeta(src);
    }
  }, []);
  return (
    <div
      class={classNames({
        "circular--portrait": dimensions.width <= dimensions.height,
        "circular--landscape": dimensions.width >= dimensions.height,
      })}
    >
      <img src={src} alt={name} />
    </div>
  );
};

export default Avatar;
