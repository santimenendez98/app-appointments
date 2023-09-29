import React, { useRef } from "react";
import styles from "./history.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

function History({ actionCancel, change, pet, edit }) {
  console.log("aca", pet);
  const historyRef = useRef(null);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    if (pet && pet.history.length > 0) {
      const quill = historyRef.current.getEditor();
      const newContent = JSON.parse(pet.history[0]);

      const delta = quill.clipboard.convert(newContent);

      quill.setContents(delta);
    }

    if (pet.history.length === 0) {
      const quill = historyRef.current.getEditor();

      const delta = quill.clipboard.convert("");

      quill.setContents(delta);
    }
  }, [pet]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <h2>HISTORY</h2>
        </div>
        <div className={styles.historyContainer}>
          <ReactQuill
            theme="snow"
            onChange={(e) => change("pet.history", e)}
            className={styles.textEditor}
            modules={module}
            defaultValue={""}
            ref={historyRef}
          />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <div>
              <button
                className={styles.cancelButton}
                onClick={actionCancel ? actionCancel : undefined}
              >
                Cancel
              </button>
            </div>
            <div>
              <button className={styles.editButton} onClick={edit}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
