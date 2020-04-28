import styled from 'styled-components';
export const ItemHolder = styled.div`
display:flex;
.item{
    width: 23%;
    padding:0px;
    min-height: 100px;
    display: flex;
    border: solid 1px;
    margin: 1%;
    align-items: center;
    justify-content: center;
    &.selected{
        background:#4d90fe;
    }
}
`;
export const ActionBar = styled.div`
display:flex;
button{
    margin-left: auto;
    padding: 5px;
}
`;
export const ItemWithQtyHolder = styled.div`
display:flex;
.item{
    min-width:100px;
}
.btn{
    padding:10px;
    margin:10px;
}
@include for-size(tablet-portrait-up) {
    display:flex;
}

`