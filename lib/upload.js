import formidable from "formidable-serverless";
import { createReadStream } from "fs";
import parseForm from "./parseForm";
import * as gcs from "./gcs";

export const method1 = async (req, res) => {
    const form = formidable();

    const { files } = await parseForm(form, req);

    const file = files.file;
    const fileName = `com_${file.name}_${Math.random()}`

    createReadStream(file.path)
        .pipe(gcs.createWriteStream(fileName, file.type))
        .on("finish", () => {
            res.status(200).json({ message: "File upload complete", fileName: `https://storage.googleapis.com/beeplus-images/${fileName}`})})
        .on("error", (err) => {
            console.error(err.message);
            res.status(500).json("File upload error: " + err.message);
        });
};