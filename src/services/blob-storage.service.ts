// const dropboxV2Api = require('dropbox-v2-api');
import { Dropbox } from 'dropbox';

export class BlobStorageService {
  constructor() {}

  public async uploadFile(filePath: string, file: Express.Multer.File): Promise<unknown> {
    try {
      const dbx = new Dropbox({
        accessToken: process.env.BLOB_STORAGE_TOKEN,
        clientId: process.env.BLOB_STORAGE_KEY,
        clientSecret: process.env.BLOB_STORAGE_SECRET,
      });

      await dbx.filesUpload({
        path: `/${filePath}`,
        contents: file.buffer,
      });

      const {
        result: { url },
      } = await dbx.sharingCreateSharedLinkWithSettings({
        path: `/${filePath}`,
      });

      const fileUrl = url.replace('www', 'dl');
      return fileUrl;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
