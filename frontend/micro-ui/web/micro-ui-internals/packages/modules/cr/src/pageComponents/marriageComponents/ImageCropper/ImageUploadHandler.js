import React, { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Toast, PopUp } from "@egovernments/digit-ui-react-components";
import UploadImages from "./UploadImages";
import _ from "lodash";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CameraSvg } from "./svgindex";
import { DeleteBtn } from "./svgindex";

const TO_RADIANS = Math.PI / 180;

let previewUrl = "";

function toBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function canvasPreview(image, canvas, crop, scale = 1, rotate = 0) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

  ctx.restore();
}

function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, [deps]);
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
async function imgPreview(image, crop, scale = 1, rotate = 0) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);

  if (!blob) {
    console.error("Failed to create blob");
    return "";
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(blob);
  return previewUrl;
}

export const ImageUploadHandler = ({ uploadedImages, onPhotoChange, tenantId,t, moduleType = "property-upload", isMulti = true, extraParams = {} }) =>
  // { uploadedImages, onPhotoChange, tenantId, moduleType = "property-upload", isMulti = true, extraParams = {} }
  {

    // const __initImageIds = Digit.SessionStorage.get("PGR_CREATE_IMAGES");
    // const __initThumbnails = Digit.SessionStorage.get("PGR_CREATE_THUMBNAILS");
    const [cropImage, setCropImage] = useState(null);
    // const [singleImage, setSingleImage] = useState(null);
    const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
    // const [uploadedImagesIds, setUploadedImagesIds] = useState(uploadedImages);

    const [rerender, setRerender] = useState(1);
    const [imageFile, setImageFile] = useState(null);

    const [isDeleting, setIsDeleting] = useState(false);

    const [toast, setToast] = useState(false);
    const [imageSizeError, setImageSizeError] = useState(false);
    const [imageTypeError, setImageTypeError] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const hiddenAnchorRef = useRef(null);
    const blobUrlRef = useRef("");
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState(3 / 4);
    const [error, setError] = useState("");

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
    // console.log({ imageFileURL });

    function getImage(e) {
      const file = e.target.files[0];
      console.log({ file });
      if (file) {
        if (file.size > 2097152) {
          setImageSizeError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
        } else if (file.name.match(/\.(jpg|jpeg|png)$/)) {
          setError(null);
          setImgSrc(window.URL.createObjectURL(file));
          setIsOpen(true);
        } else {
          setImageTypeError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
        }
      }
    }
    function onImageLoad(e) {
      if (aspect) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
      }
    }

    function onDownloadCropClick() {
      if (!previewCanvasRef.current) {
        throw new Error("Crop canvas does not exist");
      }

      previewCanvasRef.current.toBlob((blob) => {
        console.log({ blob });
        const file = new File([blob], "groom.jpg", { type: blob.type });
        console.log({ file });
        setCropImage(file);
        if (!blob) {
          throw new Error("Failed to create blob");
        }
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
        }
        blobUrlRef.current = URL.createObjectURL(blob);
        //   hiddenAnchorRef.current.href = blobUrlRef.current
        //   hiddenAnchorRef.current.click()
      });
      setIsOpen(false);
    }

    useDebounceEffect(
      async () => {
        if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
          // We use canvasPreview as it's much faster than imgPreview.
          canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
        }
      },
      100,
      [completedCrop, scale, rotate]
    );

    function handleToggleAspectClick() {
      if (aspect) {
        setAspect(undefined);
      } else if (imgRef.current) {
        const { width, height } = imgRef.current;
        setAspect(16 / 9);
        setCrop(centerAspectCrop(width, height, 4 / 3));
      }
    }

    const uploadImage = useCallback(async () => {
      const response = await Digit.UploadServices.Filestorage(moduleType, cropImage, tenantId, extraParams);
      console.log({ response });
    }, [cropImage]);

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
    useEffect(() => {
      if (cropImage) {
        uploadImage();
      }
    }, [cropImage]);

    return (
      <React.Fragment>
        {/* {error && <Toast error={true} label={error} onClose={() => setError(null)} />} */}
        <div className="upload-single-wrap">
          <CameraSvg />
          <input type="file" id="upload" accept="image/*" onChange={getImage} />
        </div>
        {isOpen && (
          <PopUp>
            <div className="popup-module" style={{ borderRadius: "8px" }}>
              <div>
                <label htmlFor="scale-input">Scale: </label>
                <input
                  id="scale-input"
                  type="number"
                  step="0.1"
                  value={scale}
                  disabled={!imgSrc}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rotate-input">Rotate: </label>
                <input
                  id="rotate-input"
                  type="number"
                  value={rotate}
                  disabled={!imgSrc}
                  onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
                />
              </div>
              <div style={{ display: "none" }}>
                <button onClick={handleToggleAspectClick}>Toggle aspect {aspect ? "off" : "on"}</button>
              </div>
              <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)} aspect={aspect}>
                <img ref={imgRef} alt="Crop me" src={imgSrc} style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }} onLoad={onImageLoad} />
              </ReactCrop>
              {!!completedCrop && (
                <React.Fragment>
                  <div style={{ display: "none" }}>
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        border: "1px solid black",
                        objectFit: "contain",
                        width: completedCrop.width,
                        height: completedCrop.height,
                      }}
                    />
                  </div>
                  <div>
                    <button onClick={onDownloadCropClick}>Crop and Upload</button>
                    <a
                      ref={hiddenAnchorRef}
                      download
                      style={{
                        position: "absolute",
                        top: "-200vh",
                        visibility: "hidden",
                      }}
                    >
                      Hidden Crop and Upload
                    </a>
                  </div>
                </React.Fragment>
              )}
            </div>
          </PopUp>
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
