import classNames from "classnames";
import React, { useEffect, useState } from "react";

import "./style.css";

const Avatar = ({ src, name }) => {
  const [dimensions, setDimensions] = useState({});
  console.log({ name, dimensions });

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
      class={classNames("base", {
        "circular--portrait": dimensions.width <= dimensions.height,
        "circular--landscape": dimensions.width >= dimensions.height,
      })}
    >
      {src && dimensions.width ? (
        <img src={src} alt={name} />
      ) : (
        <div className="circular--no-image">
          {name
            .split(" ")
            .map((item) => item[0])
            .join("")}
        </div>
      )}
    </div>
  );
};

export default Avatar;
