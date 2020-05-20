import styled from "styled-components";
export const PreSearch = styled.div`
  label{
    padding:10px;
  }
`;
export const White70 = styled.div`
  width: 75%;
  display: block;
  padding: 0px 0px 30px;
  .tab {
    .tab-more-button {
      float: right;
    }
    min-height: 300px;
    background: #fff;
    width: 100%;
    .react-tabs__tab-list {
      background: whitesmoke;
    }
    .tab-content {
      display: flex;
      .logo {
        width: 115px;
        border: solid 4px #f5f5f5;
        max-height: 115px;
      }
    }
  }

  .left {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
    width: 30%;
  }
  .right {
    width: 70%;
  }
`;
export const Row = styled.div`
  display: flex;
`;
export const TitleWithAction = styled.div`
  display: flex;
  margin: 10px 10px 0 0;
  align-items: center;
  h2 {
    margin: 0 10px;
  }
  button {
    margin-left: auto;
    outline: none;
    background: #f6faff;
    border: 1px solid #e8eff9;
    color: #63799b;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 0px;
    transition: 0.5s all;
  }
  button:hover {
    background: #113c5e;
    color: #f6faff;
  }
`;
export const FormHolder = styled.div`
  display: block;
  .two-panel {
    display: flex;
    .input-holder {
      width: 80%;
    }
    .uploader {
      width: 150px;
      height: 150px;
      display: block;
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
    }
  }
  h2 {
    border-bottom: solid 1px #e1e1e1;
    padding: 6px 0px;
  }
  input {
    margin-right: 5px;
    margin: 0px 10px;
    padding: 10px;
  }
  textarea {
    width: 97%;
    margin: 10px;
    height: 100px;
  }
  .dropdown{
      display: inline-block;
      min-width: 200px;
  }
  button {
    display: block;
    padding: 10px;
    margin: 20px;
    margin-left: auto;
  }
`;
export const White30 = styled.div`
  position: absolute;
  right: 20px;
  min-width: 24%;
`;
export const FlexFull = styled.div`
  display: flex;
  width: 100%;
`;
export const ActionRow = styled.div`
  margin-left: auto;
  width: auto;
  padding: 5px;
  button {
    margin-right: 10px;
    padding: 10px;
    padding-left: 28px;
  }
`;
export const ListItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  .btn {
    margin-left: auto;
    display: flex;
    padding: 6px 0px;
  }
  h2 {
    margin: 5px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
  }
  .item {
    background: #fff;
    border-bottom: solid 1px #f1f1f1;
    display: flex;
    width: 100%;
    padding: 10px;
    min-height: 50px;
    .left {
      width: 65px;
      display: flex;
      align-content: center;
      justify-content: center;
      align-self: center;
    }
    .right {
      h3 {
        margin: 0px;
        font-size: 20px;
        line-height: 24px;
        font-weight: 300;
      }
    }
  }
`;
export const OrgSideHolder = styled.div`
  display: flex;
  border: solid 1px #e8eff9;
  width: 100%;
  height: auto;
  margin: 15px;
  border-radius: 10px;
  background: #f6faff;
  nav {
    width: 100%;
    ul {
      list-style: none;
      padding: 0;
      li {
        border-bottom: dashed 1px;
        padding: 0px 10px;
        img {
          max-width: 24px;
        }
        span:last-child {
          margin-left: auto;
          display: block;
          text-align: right;
          float: right;
          direction: rtl;
        }
        span:nth-child(2) {
          padding: 0px 0 0 10px;
          font-size: 16px;
        }
        a {
          color: #222222;
          padding: 15px 0;
          text-decoration: none;
          font-size: large;
          line-height: 18px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;
