import { invoke } from "@tauri-apps/api/tauri";

const getSettings = async (reloadCache = false) => {
  if (!reloadCache) {
    if (window._SETTINGS_) {
      return window._SETTINGS_;
    }
  }
  // const result: string = new Promise((resolve, reject) =>
  //   // invoke("get_settings").then((r) => resolve((r1) => console.log("rrr", r)))
  // );
  const result = await invoke("get_settings");
  window._SETTINGS_ = JSON.parse(result);
  return JSON.parse(result);
  /*  const result: string = invoke("get_settings").then((res) => {
    window._SETTINGS_ = JSON.parse(res);
    return JSON.parse(res);
  }); */
  //   window._SETTINGS_ = JSON.parse(result);
  //   return JSON.parse(result);
  //   return res.data;
  // });
  //   if (!reloadCache) {
  //     const result: string = await invoke("get_settings");
  //     window._SETTINGS_ = JSON.parse(result);
  //     return JSON.parse(result);
  //   } else {
  //     const result = await invoke("get_settings");
  //     window._SETTINGS_ = JSON.parse(result);
  //     return JSON.parse(result);
  //   }
  //   if (window !== undefined && window._SETTINGS_ !== undefined) {
  //   }
  //   windo
};

export default getSettings;
