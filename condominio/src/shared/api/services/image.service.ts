import { AxiosResponse } from "axios";
import { axiosPrivate } from "../axiosPrivate";

export const fetchUploadImage = async (image: object) => {
  try {
    const { data } = await axiosPrivate.post(
      "/api/v1/models/image/upload",
      image
    );
    return await data;
  } catch (error) {
    return "";
  }
};

export const UploadImages = async (images: (Blob | File)[]) => {
  const urlPath = "/api/v1/models/image/upload";
  const urlImages: string[] = [];
  const formData: FormData[] = [];
  const uploadPromises: Promise<AxiosResponse<{ url: string }, unknown>>[] = [];

  if (images.length == 0) {
    return undefined;
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    formData[i] = new FormData();
    formData[i].append("file", image);
    const uploadPromise = axiosPrivate.post<{ url: string }>(
      urlPath,
      formData[i]
    );
    uploadPromises.push(uploadPromise);
  }

  await Promise.all(uploadPromises).then(async (urls) => {
    for (const uploadedFile of urls) {
      urlImages.push(uploadedFile.data.url);
    }
  });

  return urlImages;
};
