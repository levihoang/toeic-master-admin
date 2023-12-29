/*eslint no-control-regex: "off"*/
export const FORM_CONST = {
  FORGOT_PASSWORD: 'Enter your registered email below to recieve password reset instructions',
  PASSWORD_RESET_SUCCESS: 'Your password was reset successfully!',
  IS_REQUIRED: 'This field is required',
  MAX_LENGTH: 'You exceeded the max length',
  MIN_LENGTH: 'Password must have at least 6 characters',
  PASSWORD_NOT_MATCH: "Password doesn't match",
  EMAIL_VALIDATE: 'Email is invalid',
  PASSWORD_VALIDATE:
    'Password must at have least 10 characters, at least one capital letter, at least one number AND at least one special character',
  NUMBER_VALIDATE: 'Number only',
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;\"\'<>,.?/])(?=.*\d)[A-Za-z\d~!@#$%^&*_\-+=`|\\(){}[\]:;\"\'<>,.?/]{10,64}$/,
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NUMBER_REGEX: /^[0-9]*$/,
};

export const FORM_FORMAT = {
  TABLE_DATE: 'DD/MM/YY',
  TABLE_DATEFULLYEAR: 'DD/MM/YYYY',
  TABLE_DATETIME: 'DD/MM/YY HH:mm:ss',
};

export const AUTHENTICATION = {
  UNAUTHORIZED: 'Incorrect email or password',
  TOO_MANY_REQUESTS:
    'You are making too many requests. You will be frozen in action for a short time',
};

export const STYLE_EDITOR = {
  BLOG: `
    body {
      margin: 0;
      padding: 0;
      font-family: Plus Jakarta Sans, sans-serif;
      font-size:15px;
    }
    p{
      margin:0;
      font-size:15px;
      line-height: 18px;
    }
    h1{
      font-size: 28px;
      line-height: 33px;
    }
    h2{
      font-size:20px;
      line-height: 26px;
    }
    h3{
      font-size:19px;
      line-height: 26px;
    }
  `,
  FASHCARD: `
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans';
      font-size: 19px;
    }
    p{
        font-size:19px;
        line-height: 26px;
    }
    h1{
        font-size: 28px;
        line-height: 35px;
        margin-bottom: 40px;
    }
    h2{
        font-size:20px;
        line-height: 26px;
    }
    h3{
        font-size:19px;
        line-height: 26px;
    }
  `,
};

export const INIT_EDITOR_DEFAULT = `<p style="display: none;">
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link href="https://fonts.googleapis.com/css?family=Plus Jakarta Sans" rel="stylesheet">
<style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans';
      font-size:15px;
    }
    a {
      text-decoration: none;
      color:#0C66E4;
    }
    p{
      font-size:15px;
      text-align:left;
      line-height: 18px;
      font-family: "Plus Jakarta Sans";
    }
    h1{
      font-size: 28px;
      line-height: 33px;
      text-align:left;
      font-family: "Plus Jakarta Sans";
    }
    h2{
      font-size:20px;
      text-align:left;
      font-family: "Plus Jakarta Sans";
      line-height: 26px;
    }
    h3{
      font-size:19px;
      text-align:left;
      font-family: "Plus Jakarta Sans";
      line-height: 26px;
    }
    table > tbody > tr > td {
      border-style: solid; 
      border-color: gray; 
      border-width: 2px;
      text-align: center;
      font-size: 9px;
      font-family: "Plus Jakarta Sans";
    }
    * {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }
</style>
</p>
<p>Text Here</p>`;

export const INIT_FLASHCARD_EDITOR_DEFAULT = `<p style="display: none;">
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link href="https://fonts.googleapis.com/css?family=Plus Jakarta Sans" rel="stylesheet">
<style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans';
      font-size:15px;
    }
    a {
      text-decoration: none;
      color:#0C66E4;
    }
    p{
      font-size:19px;
      text-align:left;
      line-height: 26px;
      font-family: "Plus Jakarta Sans";
    }
    h1{
      font-size: 28px;
      line-height: 35px;
      text-align:left;
      font-family: "Plus Jakarta Sans";
      margin-bottom: 40px;
    }
    h2{
      font-size:20px;
      text-align:left;
      font-family: "Plus Jakarta Sans";
      line-height: 26px;
    }
    h3{
      font-size:19px;
      text-align:left;
      font-family: "Plus Jakarta Sans";
      line-height: 26px;
    }
    table > tbody > tr > td {
      border-style: solid; 
      border-color: gray; 
      border-width: 2px;
      text-align: center;
      font-size: 9px;
      font-family: "Plus Jakarta Sans";
    }
    * {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }
</style>
</p>
<p>Text Here</p>
`;

export const INIT_NOTIFICATION_EMMAIL_CONTENT = `
<div style="max-width: 680px; width: 100%; margin: 0 auto;">
<p style="display: none;">
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link href="https://fonts.googleapis.com/css?family=Plus Jakarta Sans" rel="stylesheet">
<style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans';
    }
    a {
      text-decoration: none;
      color:#0C66E4;
    }
    tr > th, tr > td {
      border: 1px solid #e5e5e5;
    }
    p{
      font-family: "Plus Jakarta Sans";
    }
    h1{
      font-family: "Plus Jakarta Sans";
    }
    h2{
      font-family: "Plus Jakarta Sans";
    }
    h3{
      font-family: "Plus Jakarta Sans";
    }
    * {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }
</style>
</p>
  <div>
      <p>Nội dung</p>
  </div>
  <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px">
    <a href="https://afclick.tititada.com/QA53/k5csmruy" target="_blank" style="cursor: pointer; color: #000000 !important;">
      <div style="width: 160px; height: 38px; background-color: #FADF4A; font-size: 14px; font-weight: 700; display: flex; justify-content: center; align-items: center; border-radius: 4px;">👉 Vào app ngay!</div>
    </a>
  </div>
  <div style="width: 100%; background-color: #FADF4A; padding: 20px; margin-top: 20px">
      <div style="display: flex; justify-content: space-between; gap: 4px; padding-top: 20px">
          <div>
              <a href="https://tititada.com/" target="_blank" style="cursor: pointer;">
                  <img src="https://statics.tititada.com/News/20231013/4bbdab0d-acb1-430e-a70d-9869ba12708f_114135" width="140px">
              </a>
          </div>
          <div style="display: flex; gap: 4px; padding-top:4px">
              <a href="https://apps.apple.com/vn/app/tititada-%C4%91%E1%BA%A7u-t%C6%B0-ch%E1%BB%A9ng-kho%C3%A1n/id1606140975" target="_blank" style="cursor: pointer;">
                  <img src="https://statics.tititada.com/News/20231013/8191c628-16d1-4d14-aca0-c84026249954_114144" width="100px">
              </a>
              <a href="https://play.google.com/store/apps/details?id=vn.tititada.trading" target="_blank" style="cursor: pointer;">
                  <img src="https://statics.tititada.com/News/20231013/675c11bb-6eb1-4880-9821-256881243a6f_114152" width="100px">
              </a>
          </div>
      </div>
      <div style="margin-top: 40px; font-size: 14px; font-weight: 500;">
          © Tititada 2023
      </div>
      <div style="margin-top: 8px; margin-bottom: 40px; font-size: 14px; font-weight: 500;">
          Tầng 10, Tòa nhà FiveStar, Số 28bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh
      </div>

      <div style="padding-top: 40px; padding-bottom: 20px; border-top: 1px solid #495057;">
          <div style="display: flex; gap: 8px;">
              <a href="https://www.facebook.com/tititadavn" target="_blank" style="cursor: pointer;">
                  <img src="https://statics.tititada.com/News/20231013/467bea69-7514-47ce-8bd1-f1343c881dba_132830" width="40px">
              </a>
              <a href="https://www.tiktok.com/@tititada_vn" target="_blank" style="cursor: pointer;">
                  <img src="https://statics.tititada.com/News/20231013/b8e007b4-d817-4178-9599-9c9401f92811_114206" width="40px">
              </a>
              <a href="https://www.linkedin.com/company/tititada/" target="_blank" style="cursor: pointer;">
                  <img src="https://statics.tititada.com/News/20231013/c9b58b66-55b2-4fe5-9617-ed4f5c290ece_114212" width="40px">
              </a>
              <a href="https://www.youtube.com/@tititada6777" target="_blank" style="cursor: pointer;">
                  <img src="https://statics.tititada.com/News/20231013/100ce9ad-e034-4557-877a-e50f825338d4_114217" width="40px">
              </a>
          </div>
      </div>
  </div>
</div>
`

export const STYLE_EDITOR_DEFAULT = {
  IMG_TYPE: [
    'image/apng',
    'image/avif',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ],
  VIDEO_TYPE: [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/x-ms-wmv',
  ],
};

export const EMAIL_TEMPLATE_1 = 
{
    "counters": {
        "u_column": 18,
        "u_row": 12,
        "u_content_button": 2,
        "u_content_image": 8,
        "u_content_text": 3,
        "u_content_divider": 1,
        "u_content_menu": 1
    },
    "body": {
        "id": "4nCHfk4RCK",
        "rows": [
            {
                "id": "VseGz-5UXT",
                "cells": [
                    1
                ],
                "columns": [
                    {
                        "id": "kHHDOLxAUY",
                        "contents": [
                            {
                                "id": "eH1Hod-bta",
                                "type": "text",
                                "values": {
                                    "containerPadding": "10px",
                                    "anchor": "",
                                    "fontSize": "14px",
                                    "textAlign": "left",
                                    "lineHeight": "140%",
                                    "linkStyle": {
                                        "inherit": true,
                                        "linkColor": "#0000ee",
                                        "linkHoverColor": "#0000ee",
                                        "linkUnderline": true,
                                        "linkHoverUnderline": true
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_text_2",
                                        "htmlClassNames": "u_content_text"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "text": "<p style=\"line-height: 140%;\">Tititada</p>\n<p style=\"line-height: 140%;\">Đầu tư chứng khoán cùng chuyên gia!</p>"
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_1",
                                "htmlClassNames": "u_column"
                            }
                        }
                    }
                ],
                "values": {
                    "displayCondition": null,
                    "columns": false,
                    "backgroundColor": "",
                    "columnsBackgroundColor": "",
                    "backgroundImage": {
                        "url": "",
                        "fullWidth": true,
                        "repeat": "no-repeat",
                        "size": "custom",
                        "position": "center",
                        "customPosition": [
                            "50%",
                            "50%"
                        ]
                    },
                    "padding": "0px",
                    "anchor": "",
                    "hideDesktop": false,
                    "_meta": {
                        "htmlID": "u_row_1",
                        "htmlClassNames": "u_row"
                    },
                    "selectable": true,
                    "draggable": true,
                    "duplicatable": true,
                    "deletable": true,
                    "hideable": true
                }
            },
            {
                "id": "i0Tng3zVWO",
                "cells": [
                    1
                ],
                "columns": [
                    {
                        "id": "aetyEftQM2",
                        "contents": [
                            {
                                "id": "swhIXMSYKM",
                                "type": "button",
                                "values": {
                                    "containerPadding": "10px",
                                    "anchor": "",
                                    "href": {
                                        "name": "web",
                                        "values": {
                                            "href": "",
                                            "target": "_blank"
                                        }
                                    },
                                    "buttonColors": {
                                        "color": "#000000",
                                        "backgroundColor": "#fadf4a",
                                        "hoverColor": "#FFFFFF",
                                        "hoverBackgroundColor": "#3AAEE0"
                                    },
                                    "size": {
                                        "autoWidth": true,
                                        "width": "100%"
                                    },
                                    "fontWeight": 700,
                                    "fontSize": "14px",
                                    "textAlign": "center",
                                    "lineHeight": "120%",
                                    "padding": "10px 20px",
                                    "border": {},
                                    "borderRadius": "4px",
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_button_1",
                                        "htmlClassNames": "u_content_button"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "text": "👉 Vào app ngay!",
                                    "calculatedWidth": 159,
                                    "calculatedHeight": 37
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_2",
                                "htmlClassNames": "u_column"
                            }
                        }
                    }
                ],
                "values": {
                    "displayCondition": null,
                    "columns": false,
                    "backgroundColor": "",
                    "columnsBackgroundColor": "",
                    "backgroundImage": {
                        "url": "",
                        "fullWidth": true,
                        "repeat": "no-repeat",
                        "size": "custom",
                        "position": "center"
                    },
                    "padding": "10px 0px",
                    "anchor": "",
                    "hideDesktop": false,
                    "_meta": {
                        "htmlID": "u_row_2",
                        "htmlClassNames": "u_row"
                    },
                    "selectable": true,
                    "draggable": true,
                    "duplicatable": true,
                    "deletable": true,
                    "hideable": true
                }
            },
            {
                "id": "Gdb933XE1p",
                "cells": [
                    52.6,
                    24.22,
                    23.18
                ],
                "columns": [
                    {
                        "id": "rAY0Uq3ln6",
                        "contents": [
                            {
                                "id": "YNrvpDyQFp",
                                "type": "image",
                                "values": {
                                    "containerPadding": "30px 131px 20px 20px",
                                    "anchor": "",
                                    "src": {
                                        "url": "https://assets.unlayer.com/stock-templates/1701067002189-tititada_logo_black.png",
                                        "width": 549,
                                        "height": 132,
                                        "autoWidth": false,
                                        "maxWidth": "70%"
                                    },
                                    "textAlign": "left",
                                    "altText": "",
                                    "action": {
                                        "name": "web",
                                        "values": {
                                            "href": "",
                                            "target": "_blank"
                                        }
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_image_1",
                                        "htmlClassNames": "u_content_image"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "_override": {
                                        "mobile": {
                                            "hideMobile": false,
                                            "textAlign": "center",
                                            "containerPadding": "29px 10px 10px"
                                        }
                                    }
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_3",
                                "htmlClassNames": "u_column"
                            }
                        }
                    },
                    {
                        "id": "OauxzbRFbl",
                        "contents": [
                            {
                                "id": "7TTQDzqLrJ",
                                "type": "image",
                                "values": {
                                    "containerPadding": "30px 10px 10px",
                                    "anchor": "",
                                    "src": {
                                        "url": "https://assets.unlayer.com/stock-templates/1701067196027-Appstore.png",
                                        "width": 564,
                                        "height": 164,
                                        "autoWidth": false,
                                        "maxWidth": "95%"
                                    },
                                    "textAlign": "center",
                                    "altText": "",
                                    "action": {
                                        "name": "web",
                                        "values": {
                                            "href": "https://apps.apple.com/vn/app/tititada-%C4%91%E1%BA%A7u-t%C6%B0-ch%E1%BB%A9ng-kho%C3%A1n/id1606140975",
                                            "target": "_blank"
                                        },
                                        "attrs": {
                                            "href": "{{href}}",
                                            "target": "{{target}}"
                                        }
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_image_2",
                                        "htmlClassNames": "u_content_image"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "_override": {
                                        "mobile": {
                                            "src": {
                                                "autoWidth": false,
                                                "maxWidth": "53%"
                                            }
                                        }
                                    }
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_4",
                                "htmlClassNames": "u_column"
                            }
                        }
                    },
                    {
                        "id": "C68VED0kJT",
                        "contents": [
                            {
                                "id": "mdbezSElgc",
                                "type": "image",
                                "values": {
                                    "containerPadding": "29px 10px 10px",
                                    "anchor": "",
                                    "src": {
                                        "url": "https://assets.unlayer.com/stock-templates/1701067240083-CH%20PLAY.png",
                                        "width": 564,
                                        "height": 164
                                    },
                                    "textAlign": "center",
                                    "altText": "",
                                    "action": {
                                        "name": "web",
                                        "values": {
                                            "href": "https://play.google.com/store/apps/details?id=vn.tititada.trading",
                                            "target": "_blank"
                                        },
                                        "attrs": {
                                            "href": "{{href}}",
                                            "target": "{{target}}"
                                        }
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_image_3",
                                        "htmlClassNames": "u_content_image"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "_override": {
                                        "mobile": {
                                            "src": {
                                                "autoWidth": false,
                                                "maxWidth": "55%"
                                            }
                                        }
                                    }
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_8",
                                "htmlClassNames": "u_column"
                            }
                        }
                    }
                ],
                "values": {
                    "displayCondition": null,
                    "columns": false,
                    "backgroundColor": "",
                    "columnsBackgroundColor": "",
                    "backgroundImage": {
                        "url": "",
                        "fullWidth": true,
                        "repeat": "no-repeat",
                        "size": "custom",
                        "position": "center"
                    },
                    "padding": "0px",
                    "anchor": "",
                    "hideDesktop": false,
                    "_meta": {
                        "htmlID": "u_row_3",
                        "htmlClassNames": "u_row"
                    },
                    "selectable": true,
                    "draggable": true,
                    "duplicatable": true,
                    "deletable": true,
                    "hideable": true
                }
            },
            {
                "id": "TzQw3hoOpS",
                "cells": [
                    1
                ],
                "columns": [
                    {
                        "id": "M3bVsaoTqP",
                        "contents": [
                            {
                                "id": "ILD4DBgcXp",
                                "type": "text",
                                "values": {
                                    "containerPadding": "30px 10px 10px 20px",
                                    "anchor": "",
                                    "fontWeight": 400,
                                    "fontSize": "14px",
                                    "textAlign": "left",
                                    "lineHeight": "140%",
                                    "linkStyle": {
                                        "inherit": true,
                                        "linkColor": "#0000ee",
                                        "linkHoverColor": "#0000ee",
                                        "linkUnderline": true,
                                        "linkHoverUnderline": true
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_text_1",
                                        "htmlClassNames": "u_content_text"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "text": "<p style=\"line-height: 140%;\">© Tititada 2023</p>\n<p style=\"line-height: 140%;\">Tầng 10, Tòa nhà FiveStar, Số 28bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh</p>"
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_9",
                                "htmlClassNames": "u_column"
                            }
                        }
                    }
                ],
                "values": {
                    "displayCondition": null,
                    "columns": false,
                    "backgroundColor": "",
                    "columnsBackgroundColor": "",
                    "backgroundImage": {
                        "url": "",
                        "fullWidth": true,
                        "repeat": "no-repeat",
                        "size": "custom",
                        "position": "center"
                    },
                    "padding": "0px",
                    "anchor": "",
                    "hideDesktop": false,
                    "_meta": {
                        "htmlID": "u_row_6",
                        "htmlClassNames": "u_row"
                    },
                    "selectable": true,
                    "draggable": true,
                    "duplicatable": true,
                    "deletable": true,
                    "hideable": true
                }
            },
            {
                "id": "cHW0QGP4ru",
                "cells": [
                    1
                ],
                "columns": [
                    {
                        "id": "TvkZjpFZLg",
                        "contents": [
                            {
                                "id": "TEPlpk8yQ2",
                                "type": "divider",
                                "values": {
                                    "width": "100%",
                                    "border": {
                                        "borderTopWidth": "1px",
                                        "borderTopStyle": "solid",
                                        "borderTopColor": "#495057"
                                    },
                                    "textAlign": "center",
                                    "containerPadding": "20px 10px 20px 20px",
                                    "anchor": "",
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_divider_1",
                                        "htmlClassNames": "u_content_divider"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_14",
                                "htmlClassNames": "u_column"
                            }
                        }
                    }
                ],
                "values": {
                    "displayCondition": null,
                    "columns": false,
                    "backgroundColor": "",
                    "columnsBackgroundColor": "",
                    "backgroundImage": {
                        "url": "",
                        "fullWidth": true,
                        "repeat": "no-repeat",
                        "size": "custom",
                        "position": "center"
                    },
                    "padding": "0px",
                    "anchor": "",
                    "hideDesktop": false,
                    "_meta": {
                        "htmlID": "u_row_8",
                        "htmlClassNames": "u_row"
                    },
                    "selectable": true,
                    "draggable": true,
                    "duplicatable": true,
                    "deletable": true,
                    "hideable": true
                }
            },
            {
                "id": "G9jhWkzq86",
                "cells": [
                    15.63,
                    15.63,
                    15.63,
                    53.11
                ],
                "columns": [
                    {
                        "id": "F5QQ5xVlRa",
                        "contents": [
                            {
                                "id": "b3lAW_QG4o",
                                "type": "image",
                                "values": {
                                    "containerPadding": "10px 0px 20px 20px",
                                    "anchor": "",
                                    "src": {
                                        "url": "https://assets.unlayer.com/stock-templates/1701067456130-facebook%201.png",
                                        "width": 675,
                                        "height": 675,
                                        "autoWidth": false,
                                        "maxWidth": "35%"
                                    },
                                    "textAlign": "left",
                                    "altText": "",
                                    "action": {
                                        "name": "web",
                                        "values": {
                                            "href": "https://www.facebook.com/tititadavn",
                                            "target": "_blank"
                                        },
                                        "attrs": {
                                            "href": "{{href}}",
                                            "target": "{{target}}"
                                        }
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_image_4",
                                        "htmlClassNames": "u_content_image"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "_override": {
                                        "mobile": {
                                            "src": {
                                                "autoWidth": false,
                                                "maxWidth": "100%"
                                            },
                                            "containerPadding": "10px 8px 20px 20px",
                                            "textAlign": "left"
                                        },
                                        "desktop": {}
                                    }
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_10",
                                "htmlClassNames": "u_column"
                            }
                        }
                    },
                    {
                        "id": "oQXiP1Ukqe",
                        "contents": [
                            {
                                "id": "xr8RHKpPbJ",
                                "type": "image",
                                "values": {
                                    "containerPadding": "10px 0px 20px 20px",
                                    "anchor": "",
                                    "src": {
                                        "url": "https://assets.unlayer.com/stock-templates/1701067396190-tiktok1.png",
                                        "width": 675,
                                        "height": 675,
                                        "autoWidth": false,
                                        "maxWidth": "35%"
                                    },
                                    "textAlign": "left",
                                    "altText": "",
                                    "action": {
                                        "name": "web",
                                        "values": {
                                            "href": "https://www.tiktok.com/@tititada_vn",
                                            "target": "_blank"
                                        },
                                        "attrs": {
                                            "href": "{{href}}",
                                            "target": "{{target}}"
                                        }
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_image_5",
                                        "htmlClassNames": "u_content_image"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "_override": {
                                        "mobile": {
                                            "src": {
                                                "autoWidth": false,
                                                "maxWidth": "60%"
                                            },
                                            "containerPadding": "10px 0px 20px 10px",
                                            "textAlign": "center"
                                        }
                                    }
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_11",
                                "htmlClassNames": "u_column"
                            }
                        }
                    },
                    {
                        "id": "eTXO265xha",
                        "contents": [
                            {
                                "id": "bFvbCKrUqW",
                                "type": "image",
                                "values": {
                                    "containerPadding": "10px 0px 20px 20px",
                                    "anchor": "",
                                    "src": {
                                        "url": "https://assets.unlayer.com/stock-templates/1701067438818-ytb.png",
                                        "width": 675,
                                        "height": 675,
                                        "autoWidth": false,
                                        "maxWidth": "35%"
                                    },
                                    "textAlign": "left",
                                    "altText": "",
                                    "action": {
                                        "name": "web",
                                        "values": {
                                            "href": "https://www.youtube.com/@tititada6777",
                                            "target": "_blank"
                                        },
                                        "attrs": {
                                            "href": "{{href}}",
                                            "target": "{{target}}"
                                        }
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_image_7",
                                        "htmlClassNames": "u_content_image"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "_override": {
                                        "mobile": {
                                            "src": {
                                                "autoWidth": false,
                                                "maxWidth": "60%"
                                            },
                                            "containerPadding": "10px 0px 20px 10px",
                                            "textAlign": "center"
                                        }
                                    }
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_12",
                                "htmlClassNames": "u_column"
                            }
                        }
                    },
                    {
                        "id": "ltjPdGmLoh",
                        "contents": [
                            {
                                "id": "6TSnYpnJaz",
                                "type": "image",
                                "values": {
                                    "containerPadding": "10px 0px 20px 20px",
                                    "anchor": "",
                                    "src": {
                                        "url": "https://assets.unlayer.com/stock-templates/1701067415190-linkedin.png",
                                        "width": 675,
                                        "height": 675,
                                        "autoWidth": false,
                                        "maxWidth": "9%"
                                    },
                                    "textAlign": "left",
                                    "altText": "",
                                    "action": {
                                        "name": "web",
                                        "values": {
                                            "href": "https://www.linkedin.com/company/tititada/",
                                            "target": "_blank"
                                        },
                                        "attrs": {
                                            "href": "{{href}}",
                                            "target": "{{target}}"
                                        }
                                    },
                                    "hideDesktop": false,
                                    "displayCondition": null,
                                    "_meta": {
                                        "htmlID": "u_content_image_6",
                                        "htmlClassNames": "u_content_image"
                                    },
                                    "selectable": true,
                                    "draggable": true,
                                    "duplicatable": true,
                                    "deletable": true,
                                    "hideable": true,
                                    "_override": {
                                        "mobile": {
                                            "src": {
                                                "autoWidth": false,
                                                "maxWidth": "16%"
                                            },
                                            "containerPadding": "10px 0px 20px 16px"
                                        }
                                    }
                                }
                            }
                        ],
                        "values": {
                            "backgroundColor": "#fadf4a",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_13",
                                "htmlClassNames": "u_column"
                            }
                        }
                    }
                ],
                "values": {
                    "displayCondition": null,
                    "columns": false,
                    "backgroundColor": "",
                    "columnsBackgroundColor": "",
                    "backgroundImage": {
                        "url": "",
                        "fullWidth": true,
                        "repeat": "no-repeat",
                        "size": "custom",
                        "position": "center"
                    },
                    "padding": "0px",
                    "anchor": "",
                    "hideDesktop": false,
                    "_meta": {
                        "htmlID": "u_row_7",
                        "htmlClassNames": "u_row"
                    },
                    "selectable": true,
                    "draggable": true,
                    "duplicatable": true,
                    "deletable": true,
                    "hideable": true,
                    "_override": {
                        "mobile": {
                            "noStackMobile": true
                        }
                    }
                }
            }
        ],
        "headers": [],
        "footers": [],
        "values": {
            "popupPosition": "center",
            "popupWidth": "600px",
            "popupHeight": "auto",
            "borderRadius": "10px",
            "contentAlign": "center",
            "contentVerticalAlign": "center",
            "contentWidth": 680,
            "fontFamily": {
                "label": "Arial",
                "value": "arial,helvetica,sans-serif"
            },
            "textColor": "#000000",
            "popupBackgroundColor": "#FFFFFF",
            "popupBackgroundImage": {
                "url": "",
                "fullWidth": true,
                "repeat": "no-repeat",
                "size": "cover",
                "position": "center"
            },
            "popupOverlay_backgroundColor": "rgba(0, 0, 0, 0.1)",
            "popupCloseButton_position": "top-right",
            "popupCloseButton_backgroundColor": "#DDDDDD",
            "popupCloseButton_iconColor": "#000000",
            "popupCloseButton_borderRadius": "0px",
            "popupCloseButton_margin": "0px",
            "popupCloseButton_action": {
                "name": "close_popup",
                "attrs": {
                    "onClick": "document.querySelector('.u-popup-container').style.display = 'none';"
                }
            },
            "backgroundColor": "#ffffff",
            "backgroundImage": {
                "url": "",
                "fullWidth": true,
                "repeat": "no-repeat",
                "size": "custom",
                "position": "center"
            },
            "preheaderText": "",
            "linkStyle": {
                "body": true,
                "linkColor": "#0000ee",
                "linkHoverColor": "#0000ee",
                "linkUnderline": true,
                "linkHoverUnderline": true
            },
            "_meta": {
                "htmlID": "u_body",
                "htmlClassNames": "u_body"
            }
        }
    },
    "schemaVersion": 16
};
