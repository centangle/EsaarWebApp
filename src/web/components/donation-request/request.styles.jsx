import styled from "styled-components";

export const FormHolder = styled.div`
  .dropdown {
    display: inline-block;
    min-width: 200px;
    margin-left: 10px;
  }
  .reply {
    padding: 10px;
    margin: 0 20px;
    width: 70%;
    background: #f8f9fa;
    border: 1px solid #ccc;
    color: #727272;
    border-radius: 20px;
    outline: none;
  }

  .submit,
  select {
    padding: 10px;
  }
  select {
    background: #f8f9fa;
    border: 1px solid #ccc;
    color: #727272;
    border-radius: 20px;
    font-size: 13px;
    outline: none;
  }
  .submit {
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 10px 20px;
    background: #f8f9fa;
    color: #727272;
    cursor: pointer;
  }
  .item-adjust {
    .item {
      display: flex;
      align-items: center;
      .r {
        padding: 10px;
        margin-left: auto;
        width: 150px;
      }
      input.r {
        text-align: right;
      }
      .u {
        width: 100px;
      }
    }
    textarea {
      width: 97%;
      padding: 10px;
      margin-top: 10px;
    }
  }
`;
export const ThreadHeader = styled.div`
  .tread-title {
    float: left;
  }
  .tread-actions {
    float: right;
  }
  .tread-topic {
    clear: both;
    display: block;
    padding: 10px 0px;
  }
  .reply-btn {
    margin: auto;
    display: block;
    padding: 0;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    outline: none;
    cursor: pointer;
  }
`;
