import * as React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";

import { uploadRequest } from '../../../common/redux/upload/upload.actions';
import  {selectUploader}  from '../../../common/redux/upload/upload.selectors';

import {ProgressContainer,FileInputLabel} from './uploader.styles';


class UploaderComponent extends React.Component {
    
    upload = e => {
        const {type,item} = this.props;
        const [ ...file ] = e.target.files || e.dataTransfer.files;
        file.forEach((f)=>{
            this.props.onUpload({file:f,type,item});
        })
    }

    render() {
        const { progress,title } = this.props;
        return (
            <ProgressContainer>
                {
                    progress?<progress className="progress" value={ progress }/>:null
                }
                <FileInputLabel>
                    {title?title:'Attachment'}
                    <input type="file" multiple={true} onChange={this.upload} />
                </FileInputLabel>
            </ProgressContainer>
        );
    }
};
const mapStateToProps = createStructuredSelector({
  progress: selectUploader
});
const mapDispatchToProps = (dispatch) => ({
    onUpload: (file) => {
        dispatch(uploadRequest(file));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(UploaderComponent);