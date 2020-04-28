import styled from 'styled-components';

export const PageHolder = styled.div`
display:flex;
min-height:120vh;
.page-left{
    width: 5.8vw;
    height: 100vh;
    background: #f6faff;
    border-radius: 10px;
    position: ${props => props.position};
    top: ${props => props.top};
    min-width: 35px;
}
.page-right{
    width: 100%;
    margin-left: 5.8vw;
    padding: 110px 30px;
    overflow:auto;
}
`;