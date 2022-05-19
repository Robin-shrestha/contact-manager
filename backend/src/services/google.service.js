import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Boom from "@hapi/boom";
import { v4 as uuidv4 } from "uuid";

import directory from "../config/directory.js";
import { GoogleDriveService } from "../config/google.config.js";

dotenv.config({
  path: `${directory.root}/.env`,
});

const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || "";
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || "";
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";
const newFoldername = process.env.GOOGLE_DRIVE_FOLDER_NAME || "picture";

const googleDriveService = new GoogleDriveService(
  driveClientId,
  driveClientSecret,
  driveRedirectUri,
  driveRefreshToken
);

export const uploadFile = async (finalPath, mimeType = "image/*") => {
  const folderName = newFoldername;

  if (!fs.existsSync(finalPath)) {
    throw new Error("File not found!");
  }

  let folder = await googleDriveService
    .searchFolder(folderName)
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!folder) {
    folder = await googleDriveService.createFolder(folderName);
  }

  let res = await googleDriveService
    .saveFile(`${uuidv4()}`, finalPath, mimeType, folder.id)
    .catch((error) => {
      console.error(error);
      throw Boom.badRequest(error?.message || "Failed to upload!");
    });

  console.info("File uploaded successfully!");

  // Delete the file on the server
  fs.unlinkSync(finalPath);
  return res;
};

export const getFileUrl = async (id) => {
  let res = await googleDriveService.getUrl(id);
  return res;
};
