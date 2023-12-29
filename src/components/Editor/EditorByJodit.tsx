import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-pro-react";
// import { HOST_URL } from "constant/api.contant";

type EditorByJoditProps = {
  saveEditorStateValues: (values: any) => void;
  editorValue: any;
};

const EditorByJodit = ({
  saveEditorStateValues,
  editorValue,
}: EditorByJoditProps) => {
  const editor = useRef(null);
  const [valueEditor, setValueEditor] = useState<any>();
  const [userAuth, setUserAuth] = useState<any>();

  const getAccessToken = () => {
    let user: any = localStorage.getItem("user");
    // let user: any = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      const token = user.access_token;
      const auth = token ? `Bearer ${token}` : "";
      setUserAuth(auth);
    }
  };

  const config = {
    license: "6D25Q-0EIF0-ADNJP-UO5EZ",
    readonly: false,
    sizeSM: 400,
    minHeight: 400,
    placeholder: "Nhập nội dung...",
    uploader: {
      // url: HOST_URL + "/google-cloud/uploads",
      format: "json",
      headers: { Authorization: `${userAuth}` },
    },
    controls: {
      font: {
        list: {
          "Plus Jakarta Sans, sans-serif": "Jakarta",
          "be vietnam pro, sans-serif": "be vietnam pro",
          ProRoundedBold: "ProRoundedBold",
          ProRoundedThin: "ProRoundedThin",
          ProRoundedSemibold: "ProRoundedSemibold",
          ProRoundedRegular: "ProRoundedRegular",
          ProRoundedHeavy: "ProRoundedHeavy",
          ProRoundedBlack: "ProRoundedBlack",
        },
      },
    },
    // filebrowser: {
    // 	ajax: {
    // 		url: 'https://xdsoft.net/jodit/finder/'
    // 	},
    // 	height: 580,
    // }
  };

  useEffect(() => {
    getAccessToken();
    if (editorValue) {
      setValueEditor(editorValue);
    }
    if (!editorValue) {
      setValueEditor("");
    }
  }, []);

  return useMemo(
    () => (
      <JoditEditor
        ref={editor}
        value={valueEditor}
        config={config}
        onChange={(newContent: any) => saveEditorStateValues(newContent)}
      />
    ),
    [valueEditor]
  );
};

export default EditorByJodit;
