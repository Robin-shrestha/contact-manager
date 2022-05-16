import classNames from "classnames";
import React, { useEffect, useState } from "react";

import "./style.css";

const Avatar = ({ src, name }) => {
  const [dimensions, setDimensions] = useState({});

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
  }, [src]);

  return (
    <div
      className={classNames("base", {
        "circular--portrait": dimensions.width <= dimensions.height,
        "circular--landscape": dimensions.width >= dimensions.height,
      })}
    >
      {src && dimensions.width ? (
        <img src={src} alt={name} />
      ) : (
        <div className="circular--no-image">
          {name
            ?.split(" ")
            .slice(0, 2)
            .map((item) => item[0])
            .join("")}
        </div>
      )}
    </div>
  );
};

export default Avatar;
