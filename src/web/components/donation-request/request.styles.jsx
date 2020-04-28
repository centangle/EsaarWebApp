import styled from 'styled-components';

export const FormHolder = styled.div`
.reply{
    padding: 10px;
    margin: 0 20px;
    width: 70%;
}
.submit,select{
    padding:10px;
}
.item-adjust{
    .item{
        display: flex;
        align-items: center;
        .r{
            padding: 10px;
            margin-left: auto;
            width:150px;
        }
        input.r{
            text-align:right;
        }
        .u{
            width: 100px;
        }
    }
    textarea{
        width: 97%;
        padding: 10px;
        margin-top: 10px;
    }
}
`;
export const ThreadHeader = styled.div`
.tread-title{
    float:left;
}
.tread-actions{
    float:right;
}
.tread-topic{
    clear:both;
    display:block;
    padding:10px 0px;
}
`