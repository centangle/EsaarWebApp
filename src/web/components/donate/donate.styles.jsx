import styled from 'styled-components';
export const CartHolder = styled.div`
        background: #f6faff;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        min-height: 100vh;
        margin: 20px 0px;
        bottom: 0px;
        .action{
            position: fixed;
            bottom: 1%;
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            textarea{
                width: 98%;
                margin: 10px 0;
            }
            button{
                width: 100%;
                padding: 8px;
                margin: 0;
            }
        }
        & .cih{
        & .cart-Item{
            display:flex;
            span{
                &:first-child{
                    width:40%;
                }
                input{
                    width:60px;
                }
                display:flex;
                flex: auto;
            }
        }
    }
        
`
export const DonationHolder = styled.div`
    
`