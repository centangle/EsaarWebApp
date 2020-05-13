import styled from "styled-components";

export const GridHolder = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
`;
export const ListHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  & .left {
    /* width: 130px; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }
  & .right {
    display: flex;
    /* width: 65%; */
    width: 100%;
    .org-meta {
      align-self: center;
    }
  }
  & .action {
    button {
      height: 40px;
      margin: 5px;
    }
    /* width: 34%; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const ItemHolder = styled.div`
  margin-right: 1%;
  height: ${(props) => (props.height ? props.height + "px" : "auto")};
  h2 {
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    margin: 0;
    margin-bottom: 5px;
    padding: 5px;
    text-align: center;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    height: 34px;
    overflow: hidden;
    display: block;
    margin-bottom: 5px;
    color: #999;
  }
  &.list {
    display: flex;
    /* border-bottom: solid 1px #cbcbcb; */
    padding: 10px 0px;

    width: 200px;
    flex-direction: column;
    text-align: center;
    &:last-child {
      border-bottom: none;
    }
  }
  &.grid {
    border-radius: 10px;
    width: 16%;
    margin: 5px 10px;
    display: block;
    background: #f6faff;
    min-height: 120px;
    &:hover {
      background: #fff;
      cursor: pointer;
    }
    & .left {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      min-height: 85px;
      img {
        border-radius: 10px;
        /* width: 100%;
        max-height: 220px; */
        height: 165px;
        width: auto;
      }
    }
    & .right {
      display: flex;
      width: 100%;
      span {
        display: block;
        color: #8d8d8d;
        line-height: 18px;
        margin-top: 9px;
        overflow: hidden;
        position: relative;
        word-break: break-word;
      }
      .name {
        width: 100%;
      }
    }
    display: inline-block;
    box-shadow: 1px 4px 8px 1px rgba(0, 0, 0, 0.1);
  }
  &.aside {
  }
`;
