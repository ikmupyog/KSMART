import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@egovernments/digit-ui-react-components";
import Toast from "./Toast";
import UploadImages from "./UploadImages";
import _ from "lodash";

export const ImageUploadHandler = ({
  uploadedImages,
  onPhotoChange,
  tenantId,
  moduleType = "property-upload",
  isMulti = true,
  extraParams = {},
  type,
  t,
}) => {
  // const __initImageIds = Digit.SessionStorage.get("PGR_CREATE_IMAGES");
  // const __initThumbnails = Digit.SessionStorage.get("PGR_CREATE_THUMBNAILS");
  const [image, setImage] = useState(null);
  const [toast, setToast] = useState(false);
  const [imageSizeError, setImageSizeError] = useState(false);
  const [imageTypeError, setImageTypeError] = useState(false);
  // const [singleImage, setSingleImage] = useState(null);
  const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
  const [uploadedImagesIds, setUploadedImagesIds] = useState(uploadedImages);

  const [isGroomImageLoading, setIsGroomImageLoading] = useState(false);
  const [isBrideImageLoading, setIsBrideImageLoading] = useState(false);

  const [rerender, setRerender] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  // useEffect(() => {
  //   if (singleImage) {
  //     uploadSingleImage();
  //   }
  // }, [singleImage]);

  useEffect(() => {
    if (!isDeleting) {
      (async () => {
        if (uploadedImagesIds !== null) {
          await submit();
          setRerender(rerender + 1);
          onPhotoChange && onPhotoChange(uploadedImagesIds);
        }
      })();
    } else {
      setIsDeleting(false);
    }
  }, [uploadedImagesIds]);

  useEffect(() => {
    if(imageFile) {
      if (imageFile.size > 2097152) {
        setImageSizeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
      // else if (!isMulti && !_.isEmpty(uploadedImagesIds)) {
      //   setError("Can't upload multiple images");
      // }
      else if (imageFile?.name?.match(/\.(jpg|jpeg|png)$/)) {
        setImage(imageFile);
      } else {
        setImageTypeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    }
    
  }, [imageFile]);

  const addUploadedImageIds = useCallback(
    (imageIdData) => {
      if (uploadedImagesIds === null) {
        var arr = [];
      } else {
        arr = uploadedImagesIds;
      }
      return [...arr, imageIdData.data.files[0].fileStoreId];
    },
    [uploadedImagesIds]
  );

  // const addUploadedSingleImageIds = useCallback(
  //   (imageIdData) => {
  //     return imageIdData.data.files[0].fileStoreId;
  //   },
  //   [uploadedImagesIds]
  // );

  function getImage(e) {
    setError(null);
    setImageFile(e.target.files[0]);
  }

  const uploadImage = useCallback(async () => {
    if (type === "groomImage") {
      setIsGroomImageLoading(true);
    } else if (type === "brideImage") {
      setIsBrideImageLoading(true);
    }
    const response = await Digit.UploadServices.Filestorage(moduleType, image, tenantId, extraParams);
    setUploadedImagesIds(addUploadedImageIds(response));
  }, [addUploadedImageIds, image]);

  function addImageThumbnails(thumbnailsData) {
    var keys = Object.keys(thumbnailsData.data);
    var index = keys.findIndex((key) => key === "fileStoreIds");
    if (index > -1) {
      keys.splice(index, 1);
    }
    var thumbnails = [];
    // if (uploadedImagesThumbs !== null) {
    //   thumbnails = uploadedImagesThumbs.length > 0 ? uploadedImagesThumbs.filter((thumb) => thumb.key !== keys[0]) : [];
    // }

    const newThumbnails = keys.map((key) => {
      return { image: thumbnailsData.data[key].split(",")[2], key };
    });

    setUploadedImagesThumbs([...thumbnails, ...newThumbnails]);
  }

  const submit = useCallback(async () => {
    if (uploadedImagesIds !== null && uploadedImagesIds.length > 0) {
      const res = await Digit.UploadServices.Filefetch(uploadedImagesIds, tenantId);
      addImageThumbnails(res);
      if (type === "groomImage") {
        setIsGroomImageLoading(false);
      } else if (type === "brideImage") {
        setIsBrideImageLoading(false);
      }
    }
  }, [uploadedImagesIds]);

  function deleteImage(img) {
    setIsDeleting(true);
    var deleteImageKey = uploadedImagesThumbs.filter((o, index) => o.image === img);

    var uploadedthumbs = uploadedImagesThumbs;
    var newThumbsList = uploadedthumbs.filter((thumbs) => thumbs != deleteImageKey[0]);

    var newUploadedImagesIds = uploadedImagesIds.filter((key) => key !== deleteImageKey[0].key);
    setUploadedImagesThumbs(newThumbsList);
    setUploadedImagesIds(newUploadedImagesIds);
    onPhotoChange(newUploadedImagesIds);
    Digit.SessionStorage.set("PGR_CREATE_IMAGES", newUploadedImagesIds);
  }

  return (
    <React.Fragment>
      {error && <Toast error={true} label={error} onClose={() => setError(null)} />}
      {isBrideImageLoading || isGroomImageLoading ? (
        <Loader></Loader>
      ) : (
        <UploadImages
          isMulti={isMulti}
          onUpload={getImage}
          onDelete={deleteImage}
          thumbnails={uploadedImagesThumbs ? uploadedImagesThumbs.map((o) => o.image) : []}
        />
      )}
      {toast && (
        <Toast
          error={imageSizeError || imageTypeError}
          label={
            imageSizeError || imageTypeError
              ? imageSizeError
                ? t("IMAGE_SIZE_VALIDATION_MESSAGE")
                : imageTypeError
                ? t("IMAGE_TYPE_VALIDATION_MESSAGE")
                : setToast(false)
              : setToast(false)
          }
          onClose={() => setToast(false)}
        />
      )}
    </React.Fragment>
  );
};
