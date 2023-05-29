import Axios from "axios";
import Urls from "./urls";
export const UploadServices = {
  Filestorage: async (module, filedata, tenantId, extraParams = {}) => {
    const formData = new FormData();

    formData.append("file", filedata, extraParams?.fileName || filedata.name);
    formData.append("tenantId", tenantId);
    formData.append("module", module);

    for (const key in extraParams) {
      formData.append(key, extraParams[key]);
    }

    let tenantInfo = window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE") ? `?tenantId=${tenantId}` : "";
    var config = {
      method: "post",
      url: `${Urls.FileStore}${tenantInfo}`,
      data: formData,
      headers: { "auth-token": Digit.UserService.getUser() ? Digit.UserService.getUser()?.access_token : null },
    };

    return Axios(config);
  },

  MultipleFilesStorage: async (module, filesData, tenantId) => {
    const formData = new FormData();
    const filesArray = Array.from(filesData);
    filesArray?.forEach((fileData, index) => (fileData ? formData.append("file", fileData, fileData.name) : null));
    formData.append("tenantId", tenantId);
    formData.append("module", module);
    let tenantInfo = window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE") ? `?tenantId=${tenantId}` : "";
    var config = {
      method: "post",
      url: `${Urls.FileStore}${tenantInfo}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data", "auth-token": Digit.UserService.getUser().access_token },
    };

    return Axios(config);
  },

  Filefetch: async (filesArray, tenantId) => {
    let tenantInfo = window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE") ? `?tenantId=${tenantId}` : "";
    var config = {
      method: "get",
      url: `${Urls.FileFetch}${tenantInfo}`,
      params: {
        tenantId: tenantId,
        fileStoreIds: filesArray?.join(","),
      },
      // headers:{"content-security-policy" : { value: "default-src 'none'; img-src 'tps://ikm-rainmaker.s3-ap-south-1.amazonaws.com/kl.cochin/crmarriage/0'; script-src 'self'; style-src 'self'; object-src 'none'"} }
    };
    const res = await Axios(config);
    return res;
  },
};
