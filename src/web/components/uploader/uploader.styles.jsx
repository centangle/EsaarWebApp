import styled from "styled-components";

export const ProgressContainer = styled.span`
  .progress {
    vertical-align: baseline;
    display: flex;
    width: 100%;
    margin: 5px 0;
    position: absolute;
    top: -10px;
    left: 0;
  }
`;
export const FileInputLabel = styled.label`
  background-color: rgba(9, 30, 66, 0.04);
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  margin-top: 2px;
  max-width: 300px;
  overflow: hidden;
  padding: 20px 20px;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  input {
    display: none;
  }
`;
export const UploadedFileContainer = styled.span`
  padding: 10px;
  background: lightblue;
  margin: 5px 5px;
  display: inline-flex;
  button {
    position: absolute;
    background: none;
    border: none;
    margin-top: -15px;
    margin-left: -15px;
    padding: 0;
    cursor: alias;
  }
  .file-name {
    &:hover {
      cursor: pointer;
    }
  }
`;
