import React from 'react';
import './base64.styles.scss';
const FileBase64 = ({ onDone, multiple, children }) => {


  const handleChange = (e) => {

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length === files.length) {
          // Apply Callback function
          if (multiple) onDone(allFiles);
          else onDone(allFiles[0]);
        }

      } // reader.onload

    } // for

  }
  return (
    <>
      <label>
        {children?children:<span className='label'>Upload New</span>}
        <input
          className={`base64-input hidden`}
          type="file"
          onChange={handleChange.bind(this)}
          multiple={false} />
      </label>


    </>
  );
}
export default FileBase64;