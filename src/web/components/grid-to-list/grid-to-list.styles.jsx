import styled from 'styled-components';

export const GridHolder = styled.div`
padding:10px;
display:flex;
flex-wrap:wrap;
`
export const ListHolder= styled.div`
& .left{
    width: 130px;
    display:flex;
    align-items: center;
    justify-content: center;
    img{
        width:90%;
    }
}
& .right{
    display:flex;
    width: 65%;
}
& .action{
    button{
        height:40px;
        margin: 5px;
    }
    width: 34%;
    display: flex;
    align-items: center;
    justify-content: center;
}
`
export const ItemHolder = styled.div`
    margin-right: 1%;
    height:${props=>props.height?props.height+'px':'auto'};
    h2{
        font-size: 20px;
        line-height: 24px;
        font-weight: 300;
        margin:0;
        text-align: center;
    }
    &.list{
        display:flex;
        border-bottom: solid 1px #cbcbcb;
        padding: 10px 0px;
        &:last-child{
            border-bottom:none;
        }
    }
    &.grid{
        border-radius: 10px;
        width: 19%;
        margin: 5px;
        display:block;
        background: #f6faff;
        min-height: 120px;
        &:hover{
            background: #fff;
            cursor:pointer;
        }
        & .left{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            min-height: 85px;
            img{
                border-radius: 10px;
                width: 100%;
            }
        }
        & .right{
            display: flex;
            width: 100%;
            span{
                display:block;
                color: #8d8d8d;
                line-height: 18px;
                margin-top: 9px;
                overflow: hidden;
                position: relative;
                word-break: break-word;
            }
            div{
                width:100%;
            }
        }
        display:inline-block;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2);
    }
    &.aside{

    }
`