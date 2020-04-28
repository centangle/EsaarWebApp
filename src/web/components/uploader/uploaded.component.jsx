import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { removeRequest, downloadRequest } from '../../../common/redux/upload/upload.actions';
import { selectUploadedFiles } from '../../../common/redux/upload/upload.selectors';

import { UploadedFileContainer } from './uploader.styles';
import { baseUrl } from '../../../common/utility/request';

class UploadedComponent extends React.Component {
    upload = e => {
        const [...file] = e.target.files || e.dataTransfer.files;
        file.forEach((f) => {
            this.props.onUpload(f);
        })
    }
    remove = (file) => {
        const { onRemove } = this.props;
        onRemove(file);
    }
    download = (file) => {
        const { onDownload } = this.props;
        onDownload(file);
    }
    render() {
        const { files, type, item, logo } = this.props;
        if (logo) {
            if (files[files.length-1]) {
                return (
                    <img src={`${baseUrl}/${files[files.length-1].file}`} alt='logo' />
                );
            } else {
                return null
            }
        } else {
            return (
                <React.Fragment>
                    {
                        files.map((file) => {
                            return (
                                <UploadedFileContainer key={file}>
                                    <button onClick={(event) => this.remove({ file: file.file, uploadType: type, item })} type="button">&#10005;</button>
                                    <span onClick={(event) => this.download(file)} className="file-name">{file.name}</span>
                                </UploadedFileContainer>
                            )
                        })
                    }
                </React.Fragment>
            );
        }

    }
};
const mapStateToProps = createStructuredSelector({
    files: selectUploadedFiles
});
const mapDispatchToProps = (dispatch) => ({
    onRemove: (file) => {
        dispatch(removeRequest(file))
    },
    onDownload: (file) => {
        dispatch(downloadRequest(file))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(UploadedComponent);