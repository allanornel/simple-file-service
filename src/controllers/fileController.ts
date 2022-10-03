import * as path from "path";
import * as fs from "fs";
import { Request, Response } from "express";
import { notFoundError, wrongSchemaError } from "../utils/errorUtils.js";

export async function upload(req: Request, res: Response) {
  const __dirname = path.resolve();
  if (!req.files || Object.keys(req.files).length == 0) {
    throw wrongSchemaError("Nenhum arquivo foi recebido.");
  }
  const { optionalPath } = req.body;
  let dir = path.join(__dirname, "files");
  if (optionalPath !== undefined) dir = path.join(__dirname, `files/${optionalPath}`);
  const filesnames = Object.keys(req.files);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let checkExt = false;
  filesnames.forEach((file) => {
    const fileObj = req.files![file];
    const fileName = fileObj["name"];
    const fileContent = fileObj["data"];
    const filePath = path.join(dir, fileName);
    const extension = path.extname(fileName);
    if (extension !== ".txt" && extension !== ".xml" && extension !== ".pdf") {
      checkExt = true;
      return;
    }
    fs.writeFileSync(filePath, fileContent);
  });
  if (checkExt) return res.status(422).send("The API only accept those extensions: .pdf, .xml, .txt");
  res.status(201).send("File created!");
}

export async function getFileOrDir(req: Request, res: Response) {
  const { dirPath, filename } = req.body;
  const __dirname = path.resolve();
  if (!dirPath && !filename) res.send({ folder: fs.readdirSync(__dirname + "/files") });
  else if (dirPath && filename) {
    const dir = path.join(__dirname, `/files/${dirPath}/${filename}`);
    if (!fs.existsSync(dir)) {
      throw notFoundError("File not found!");
    }
    res.download(dir);
  } else if (dirPath) {
    const dir = path.join(__dirname, `/files/${dirPath}`);
    if (!fs.existsSync(dir)) {
      throw notFoundError("Path not found!");
    }
    res.send({ folder: fs.readdirSync(dir) });
  } else if (filename) {
    const dir = path.join(__dirname, `/files/${filename}`);
    if (!fs.existsSync(dir)) {
      throw notFoundError("File not found!");
    }
    res.download(dir);
  }
}

export async function deleteDirOrFile(req: Request, res: Response) {
  const { dirPath, filename } = req.body;
  const __dirname = path.resolve();
  if (!dirPath && !filename) throw wrongSchemaError("You must send path or filename to delete.");
  if (dirPath && filename) {
    const dir = path.join(__dirname, `files/${dirPath}`);
    if (!fs.existsSync(dir + "\\" + filename)) {
      throw notFoundError("File not found!");
    }
    fs.rmSync(`${dir}\\${filename}`);
    if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
    res.sendStatus(200);
  } else if (filename) {
    const dir = path.join(__dirname, `files`);
    if (!fs.existsSync(dir + "/" + filename)) {
      throw notFoundError("File not found!");
    }
    fs.rmSync(`${dir}/${filename}`);
    res.sendStatus(200);
  } else if (dirPath) {
    const dir = path.join(__dirname, `files/${dirPath}`);
    if (!fs.existsSync(dir)) {
      throw notFoundError("Directory not found!");
    }

    fs.rmSync(dir, { recursive: true, force: true });
    res.sendStatus(200);
  }
}
