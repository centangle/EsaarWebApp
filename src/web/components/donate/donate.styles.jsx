import styled from "styled-components";
export const CartHolder = styled.div`
  background: #f6faff;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  min-height: 100vh;
  margin: 20px 0px;
  bottom: 0px;
  .action {
    position: fixed;
    bottom: 1%;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    right: 20px;
    width: 300px;
    background: #e5f0fe;
    padding: 0 12px;
    textarea {
      width: 98%;
      margin: 10px 0;
    }
    button {
      width: 100%;
      padding: 8px;
      margin: 0;
    }
  }
  & .cih {
    h2 {
      margin: 0 0 10px;
      font-weight: 800;
      border-bottom: 1px dotted;
      padding-bottom: 5px;
    }
    & .cart-Item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      span {
        &:first-child {
          width: 40%;
        }
        input {
          width: 40px;
        }
        select {
          width: 80px;
          outline: none;
        }
        i {
          color: #e91e63;
        }
        display: flex;
        flex: auto;
        margin: 0 3px;
      }
    }
    & .cart-Item:last-child {
      border-bottom: none;
    }
  }
`;
export const DonationHolder = styled.div`
  .map-holder {
    width: 300px;
    height: 200px;
    margin: 0 10px;
    z-index: -1;
    position: relative;
    .leaflet-container {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .other-inputs{
    padding:10px 0px;
    label{
      padding:10px;
    }
  }
`;
