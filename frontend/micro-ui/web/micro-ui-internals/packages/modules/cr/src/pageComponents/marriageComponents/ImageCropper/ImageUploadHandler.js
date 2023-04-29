import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Toast, PopUp } from "@egovernments/digit-ui-react-components";
import UploadImages from "./UploadImages";
import _ from "lodash";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export const ImageUploadHandler = ({ uploadedImages, onPhotoChange, tenantId, moduleType = "property-upload", isMulti = true, extraParams = {} }) => {
  // const __initImageIds = Digit.SessionStorage.get("PGR_CREATE_IMAGES");
  // const __initThumbnails = Digit.SessionStorage.get("PGR_CREATE_THUMBNAILS");
  const [image, setImage] = useState(null);
  // const [singleImage, setSingleImage] = useState(null);
  const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
  const [uploadedImagesIds, setUploadedImagesIds] = useState(uploadedImages);

  const [rerender, setRerender] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [crop, setCrop] = useState<Crop>({
    unit: 'px', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })

//   useEffect(() => {
//     if (image) {
//       uploadImage();
//     }
//   }, [image]);

  // useEffect(() => {
  //   if (singleImage) {
  //     uploadSingleImage();
  //   }
  // }, [singleImage]);

//   useEffect(() => {
//     if (!isDeleting) {
//       (async () => {
//         if (uploadedImagesIds !== null) {
//           await submit();
//           setRerender(rerender + 1);
//           onPhotoChange && onPhotoChange(uploadedImagesIds);
//         }
//       })();
//     } else {
//       setIsDeleting(false);
//     }
//   }, [uploadedImagesIds]);

//   useEffect(() => {
//     if (imageFile && imageFile.size > 2097152) {
//       setError("File is too large");
//     } else if (!isMulti && !_.isEmpty(uploadedImagesIds)) {
//       setError("Can't upload multiple images");
//     } else {
//       setImage(imageFile);
//     }
    // if (module === "marriage") {
    //   console.log("Hi module");
    //   setSingleImage(imageFile);
    // } else {
    //   console.log("Hi module else");
    // setImage(imageFile);
    // }
//   }, [imageFile]);

//   const addUploadedImageIds = useCallback(
//     (imageIdData) => {
//       if (uploadedImagesIds === null) {
//         var arr = [];
//       } else {
//         arr = uploadedImagesIds;
//       }
//       return [...arr, imageIdData.data.files[0].fileStoreId];
//     },
//     [uploadedImagesIds]
//   );

  // const addUploadedSingleImageIds = useCallback(
  //   (imageIdData) => {
  //     return imageIdData.data.files[0].fileStoreId;
  //   },
  //   [uploadedImagesIds]
  // );

  function getImage(e) {
    const file = e.target.files[0]
    if (file && file.size > 2097152) {
        setError("File is too large");
      } else  {
        setError(null);
        setImageFileURL(URL.createObjectURL(file))
      } 
  }

//   const uploadImage = useCallback(async () => {
    // const response = await Digit.UploadServices.Filestorage(moduleType, image, tenantId, extraParams);
    // setUploadedImagesIds(addUploadedImageIds(response));
//   }, [addUploadedImageIds, image]);

  // const uploadSingleImage = useCallback(async () => {
  //   console.log("Hi from UseEffect");
  //   const response = await Digit.UploadServices.Filestorage("cr-marriage", image, tenantId);
  //   console.log({ response });
  //   setUploadedImagesIds(addUploadedImageIds(response));
  // }, [addUploadedSingleImageIds, singleImage]);

//   function addImageThumbnails(thumbnailsData) {
//     var keys = Object.keys(thumbnailsData.data);
//     var index = keys.findIndex((key) => key === "fileStoreIds");
//     if (index > -1) {
//       keys.splice(index, 1);
//     }
//     var thumbnails = [];
    // if (uploadedImagesThumbs !== null) {
    //   thumbnails = uploadedImagesThumbs.length > 0 ? uploadedImagesThumbs.filter((thumb) => thumb.key !== keys[0]) : [];
    // }

//     const newThumbnails = keys.map((key) => {
//       return { image: thumbnailsData.data[key].split(",")[2], key };
//     });

//     setUploadedImagesThumbs([...thumbnails, ...newThumbnails]);
//   }

//   const submit = useCallback(async () => {
    // if (uploadedImagesIds !== null && uploadedImagesIds.length > 0) {
    //   const res = await Digit.UploadServices.Filefetch(uploadedImagesIds, tenantId);
    //   addImageThumbnails(res);
    // }
//   }, [uploadedImagesIds]);

//   function deleteImage(img) {
//     setIsDeleting(true);
//     var deleteImageKey = uploadedImagesThumbs.filter((o, index) => o.image === img);

//     var uploadedthumbs = uploadedImagesThumbs;
//     var newThumbsList = uploadedthumbs.filter((thumbs) => thumbs != deleteImageKey[0]);

//     var newUploadedImagesIds = uploadedImagesIds.filter((key) => key !== deleteImageKey[0].key);
//     setUploadedImagesThumbs(newThumbsList);
//     setUploadedImagesIds(newUploadedImagesIds);
//     onPhotoChange(newUploadedImagesIds);
//     Digit.SessionStorage.set("PGR_CREATE_IMAGES", newUploadedImagesIds);
//   }

  return (
    <React.Fragment>
      {error && <Toast error={true} label={error} onClose={() => setError(null)} />}
      <UploadImages
        // isMulti={isMulti}
        onUpload={getImage}
        // onDelete={deleteImage}
        // thumbnails={uploadedImagesThumbs ? uploadedImagesThumbs.map((o) => o.image) : []}
      />
      {
        imageFileURL && (
            <PopUp>
                <ReactCrop src={imageFileURL} crop={crop}/>
            </PopUp>
        )

      }
    </React.Fragment>
  );
};
