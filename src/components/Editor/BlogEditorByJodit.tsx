import React, { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-pro-react';
import striptags from 'striptags';
import { INIT_EDITOR_DEFAULT } from '../../constant/form.const';

type BlogEditorByJoditProps = {
  saveEditorStateValues: (values: any) => void;
  editorValue: any;
  articleData: any[];
};

const BlogEditorByJodit = ({
  saveEditorStateValues,
  editorValue,
  articleData
}: BlogEditorByJoditProps) => {
  const editor = useRef(null);
  const [valueEditor, setValueEditor] = useState<any>();
  const [userAuth, setUserAuth] = useState<any>();
  const getAccessToken = () => {
    let user: any = localStorage.getItem('user');
    // let user: any = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      const token = user.access_token;
      const auth = token ? `Bearer ${token}` : '';
      setUserAuth(auth);
    }
  };

  const buttons = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'eraser',
    'changeCase',
    'ul',
    'ol',
    'font',
    'fontsize',
    'paragraph',
    'classSpan',
    'lineHeight',
    'superscript',
    'subscript',
    '|',
    'file',
    'image',
    'video',
    'googleMaps',
    'exportDocs',
    'spellcheck',
    'showBlocks',
    '|',
    'cut',
    'copy',
    'paste',
    'selectall',
    'copyformat',
    'pasteCode',
    '|',
    'hr',
    'table',
    {
      name: 'customLink',
      tooltip: 'Insert link',
      icon: 'link',
      popup: (editor: any, current: any, self: any, close: any) => {
        const form = editor.create.fromHTML(
          `<form class="jodit-ui-form custom-jodit-form" dir="auto">
            <div class="jodit-ui-block jodit-ui-block_align_left jodit-ui-block_size_middle">
              <div class="jodit-ui-input jodit-ui-block__url">
                <span class="jodit-ui-input__label">Tìm bài viết</span>
                <div class="jodit-ui-combo-box__wrapper">
                  <span class="jodit-ui-combo-box__icon">
                    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M306.39,154.09c19.628,4.543,35.244,21.259,39.787,39.523 c1.551,8.54,8.998,14.989,17.904,14.989c9.991,0,18.168-8.175,18.168-18.17c0-13.083-10.991-32.98-25.985-47.881 c-14.719-14.537-32.252-24.802-46.695-24.802c-9.991,0-18.172,8.45-18.172,18.446C291.396,145.094,297.847,152.546,306.39,154.09z M56.629,392.312c-14.09,14.08-14.09,36.979,0,51.059c14.08,14.092,36.981,14.092,50.965,0l104.392-104.303 c24.347,15.181,53.062,23.991,83.953,23.991c87.857,0,158.995-71.142,158.995-158.999c0-87.854-71.138-158.995-158.995-158.995 c-87.856,0-158.995,71.141-158.995,158.995c0,30.802,8.819,59.606,23.992,83.953L56.629,392.312z M182.371,204.06 c0-62.687,50.875-113.568,113.568-113.568s113.569,50.881,113.569,113.568c0,62.694-50.876,113.569-113.569,113.569 S182.371,266.754,182.371,204.06z" fillRule="evenodd"></path>
                    </svg>
                  </span>
                  <input
                    class="jodit-ui-combo-box__input pac-target-input search-blog"
                    dir="auto" name="blog" type="search"
                    placeholder="Nhập tên bài viết cần tìm" autocomplete="off"
                  >
                  <div class="jodit-popup jodit-option-list">
                  <ul class="jodit-popup__content jodit-option-list__content">
                  </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="jodit-ui-block jodit-ui-block_align_left jodit-ui-block_size_middle">
              <div class="jodit-ui-input jodit-ui-block__url">
                <span class="jodit-ui-input__label">URL</span>
                <div class="jodit-ui-input__wrapper">
                  <input class="jodit-ui-input__input" dir="auto" name="url" type="text" placeholder="http://">
                </div>
              </div>
            </div>
            <div class="jodit-ui-block jodit-ui-block_align_left jodit-ui-block_size_middle" data-ref="content_input_box" ref="content_input_box">
              <div class="jodit-ui-input jodit-ui-block__content">
                <span class="jodit-ui-input__label">Text</span>
                <div class="jodit-ui-input__wrapper">
                  <input class="jodit-ui-input__input" dir="auto" name="content" type="text" placeholder="">
                </div>
              </div>
            </div>
            <div class="jodit-ui-block jodit-ui-block_align_left jodit-ui-block_size_middle">
              <div class="jodit-ui-input jodit-ui-block__className">
                <span class="jodit-ui-input__label">Class name</span>
                <div class="jodit-ui-input__wrapper">
                  <input class="jodit-ui-input__input" dir="auto" name="className" type="text" placeholder="">
                </div>
              </div>
            </div>
            <label class="jodit-ui-checkbox jodit-ui-checkbox_checked_false jodit-ui-checkbox_switch_false jodit-ui-form__target">
              <span class="jodit-ui-checkbox__label">Open in new tab</span>
              <div class="jodit-ui-checkbox__wrapper">
                <input class="jodit-ui-checkbox__input" dir="auto" name="target" type="checkbox" placeholder="" value="false">
              </div>
            </label>
            <label class="jodit-ui-checkbox jodit-ui-checkbox_checked_false jodit-ui-checkbox_switch_false jodit-ui-form__nofollow">
              <span class="jodit-ui-checkbox__label">No follow</span>
              <div class="jodit-ui-checkbox__wrapper">
                <input class="jodit-ui-checkbox__input" dir="auto" name="nofollow" type="checkbox" placeholder="" value="false">
              </div>
            </label>
            <div class="jodit-ui-block jodit-ui-block_align_full jodit-ui-block_size_middle">
              <button class="jodit-ui-button jodit-ui-button_size_middle jodit-ui-button_insert jodit-ui-button_variant_primary jodit-ui-button_text-icons_true jodit-ui-block__insert" type="submit" role="button" aria-pressed="false">
                <span class="jodit-ui-button__icon"></span><span class="jodit-ui-button__text">Insert</span>
              </button>
            </div>
          </form>`
        );

        // Init form
        const range = editor.s.range;
        const fragment = range.cloneContents();
        const list = form.querySelector('.jodit-option-list');
        const options = list.getElementsByTagName('li');
        let bogSelected: any;

        form.querySelector('.jodit-option-list__content').innerHTML =
          articleData
            .map(
              blog =>
                `<li class="option" data-value="${blog?.value}" data-categoryId="${blog?.category_id}" data-type="${blog?.type}">${blog?.label}</li>`
            )
            .join('');

        if (fragment?.textContent) {
          form.querySelector('input[name="content"]').value = striptags(
            fragment.textContent
          );
          const template = document.createElement('template');
          template.innerHTML = editor.value;

          template.content.querySelectorAll('a').forEach(el => {
            if (el.innerText.trim() == fragment.textContent.trim()) {
              if (el.dataset.id) {
                const blog = list.querySelector(
                  `[data-value="${el.dataset.id}"]`
                );
                if (blog) {
                  bogSelected = {
                    id: blog.dataset.value,
                    type: blog.dataset.type,
                    title: blog.innerText,
                    categoryId: blog.dataset.categoryId
                  };
                  form.querySelector('input[name="blog"]').value =
                    blog?.innerText;
                  form.querySelector('input[name="url"]').disabled = true;
                } else {
                  form.querySelector('input[name="url"]').value = el.href;
                }
              } else {
                form.querySelector('input[name="url"]').value = el.href;
              }
              form.querySelector('input[name="className"]').value =
                el.className;
              form.querySelector('input[name="target"]').checked =
                el.target === '_blank';
              form.querySelector('input[name="nofollow"]').checked =
                el.dataset.ref === 'nofollow';
            }
          });
        }

        // Handle select
        form
          .querySelector('input[name="blog"]')
          .addEventListener('focus', () => {
            list.style.display = 'block';
          });

        form
          .querySelector('.jodit-ui-combo-box__wrapper')
          .addEventListener('click', (e: any) => {
            e.stopPropagation();
          });

        document.addEventListener('click', () => {
          list.style.display = 'none';
        });

        form
          .querySelector('input[name="url"]')
          .addEventListener('change', (e: any) => {
            if (e.target.value) {
              form.querySelector('input[name="blog"]').disabled = true;
            } else {
              form.querySelector('input[name="blog"]').disabled = false;
            }
          });

        form
          .querySelector('input[name="blog"]')
          .addEventListener('input', () => {
            form.querySelector('input[name="url"]').disabled = false;
            bogSelected = null;
          });

        form.querySelectorAll('.option').forEach((el: any) =>
          el.addEventListener('click', (e: any) => {
            bogSelected = {
              id: e.target.dataset.value,
              type: e.target.dataset.type,
              title: e.target.innerText,
              categoryId: e.target.dataset.categoryId
            };
            form.querySelector('input[name="url"]').disabled = true;
            form.querySelector('input[name="blog"]').value = e.target.innerText;
            list.style.display = 'none';
          })
        );

        // submit
        editor.e.on(form, 'submit', (e: any) => {
          e.preventDefault();
          let text,
            href,
            title,
            dataId,
            dataType,
            desc = 'external';
          text = form.querySelector('input[name="content"]').value;
          const className = form.querySelector('input[name="className"]').value;
          const target = form.querySelector('input[name="target"]').checked;
          const nofollow = form.querySelector('input[name="nofollow"]').checked;
          if (bogSelected) {
            title = bogSelected.title;
            dataId = bogSelected.id;
            dataType = bogSelected.type;
            // href =  getAcademyArticlePath(bogSelected);
            desc = 'internal';
          } else {
            href = form.querySelector('input[name="url"]').value;
          }
          if (!text) {
            text = bogSelected ? title : href;
          }
          if (href || form.querySelector('.option-selected')) {
            editor.s.insertHTML(
              `<a ${className ? `class="${className}"` : ''} href="${href}" ${
                dataId ? `data-id="${dataId}"` : ''
              } ${dataType ? `data-type="${dataType}"` : ''} ${
                target ? `target="_blank"` : ''
              } ${
                nofollow ? `ref="nofollow"` : ''
              } data-desc="${desc}">${text}</a>`
            );
          }
          close();
        });

        return form;
      }
    },
    'symbol',
    'emoji',
    'keyboard',
    'pageBreak',
    'outdent',
    'indent',
    'align',
    '|',
    'brush',
    'buttonGenerator',
    'iframeEditor',
    'undo',
    'redo',
    'restore',
    '|',
    'find',
    'google',
    '|',
    'source',
    'fullsize',
    'preview',
    'print',
    '|',
    'about'
  ];

  const config = {
    license: '6D25Q-0EIF0-ADNJP-UO5EZ',
    readonly: false,
    sizeSM: 400,
    minHeight: 400,
    placeholder: 'Nhập nội dung...',
    uploader: {
      // url: HOST_URL + "/google-cloud/uploads",
      format: 'json',
      headers: { Authorization: `${userAuth}` }
    },
    buttons: buttons,
    buttonsMD: buttons,
    buttonsXS: buttons,
    controls: {
      font: {
        list: {
          'Plus Jakarta Sans, sans-serif': 'Jakarta',
          'be vietnam pro, sans-serif': 'be vietnam pro',
          ProRoundedBold: 'ProRoundedBold',
          ProRoundedThin: 'ProRoundedThin',
          ProRoundedSemibold: 'ProRoundedSemibold',
          ProRoundedRegular: 'ProRoundedRegular',
          ProRoundedHeavy: 'ProRoundedHeavy',
          ProRoundedBlack: 'ProRoundedBlack'
        }
      }
    }
    // iframe: true,
    // iframeStyle: STYLE_EDITOR.BLOG,
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
      setValueEditor(INIT_EDITOR_DEFAULT);
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

export default BlogEditorByJodit;
