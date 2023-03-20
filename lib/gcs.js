import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    keyFilename: "GCSKeys.json",
})

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

export const createWriteStream = (filename, contentType) => {
    const ref = bucket.file(filename);

    const stream = ref.createWriteStream({
        gzip: true,
        contentType: contentType,
    })

    return stream;
}