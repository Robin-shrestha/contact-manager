// export const phoneNumber = new RegExp("^d{10}$");
export const phoneNumber =
  /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{1,3}\)?|\d{1,3})( |-|\.)?(\d{1,3}( |-|\.)?\d{4})/g;
