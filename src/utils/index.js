
export const requestInfoToResponseInfo = async (requestinfo, success) => {
    console.log("log responseInfo enter ", requestinfo);
    let ResponseInfo = {
      apiId: "",
      ver: "",
      ts: 0,
      resMsgId: "",
      msgId: "",
      status: ""
    };
    ResponseInfo.apiId =
      requestinfo && requestinfo.apiId ? requestinfo.apiId : "";
    ResponseInfo.ver = requestinfo && requestinfo.ver ? requestinfo.ver : "";
    ResponseInfo.ts = requestinfo && requestinfo.ts ? requestinfo.ts : null;
    ResponseInfo.resMsgId = "uief87324";
    ResponseInfo.msgId =
      requestinfo && requestinfo.msgId ? requestinfo.msgId : "";
    ResponseInfo.status = success ? "successful" : "failed";
  
    return ResponseInfo;
  };
