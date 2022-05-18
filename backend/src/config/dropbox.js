import { Dropbox } from "Dropbox";
import DropboxV2 from "dropbox-v2-api";
import axios from "axios";

export const accessToken =
  "sl.BH20XGzdYWMGshkZV8Bi9pUJxcocDLG0Bx0TNmB2kk1gc11-BYLe-vpbgjtq4_hWJD2P3LCrtHIE1HOFQMS5jk5afJNKzALbfLigpjQtP6EU3WtnfTNLQE6BjNqjil9ZOlqK9xlZ0Q88";
export const appKey = "0lmts2zt4kx4csu";
export const appsecret = "l5xs11crvpa5kwh";
var dbx = new Dropbox({ accessToken: accessToken, fetch: axios });

export default dbx;
