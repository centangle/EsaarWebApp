import styled from 'styled-components';

export const FormHolder = styled.div`
display:block;
.two-panel{
    display:flex;
    .input-holder{
        width: 80%;
    }
    .uploader{
        width: 150px;
        height: 150px;
        display: block;
        text-align:center;
        img{
            width: 150px;
            height: 150px;
        }
    }
}
h2{
    border-bottom: solid 1px #e1e1e1;
    padding: 6px 0px;
}
input{
    margin-right:5px;
    margin: 10px 10px;
    padding: 10px
}
textarea{
    width: 97%;
    margin: 10px;
    height:100px;
}
button{
    display: block;
    padding: 10px;
    margin: 20px;
    margin-left: auto;
}
`;