import React, { useState } from "react";
import { connect } from "react-redux";
import { FormHolder } from "./request.styles";
import UploaderComponent from "../uploader/uploader.component";
import Select from "react-select";
const baseUrl = require("../../../common/utility/request").baseUrl;
const RequestAdder = ({
  files,
  dispatch,
  match,
  statusToBe,
  moderators,
  type,
}) => {
  const [state, setState] = useState({ Note: "", ModeratorAssigned: "" });
  const handleClick = () => {
    dispatch({
      type: "ADD_REQUEST_THREAD_START",
      payload: {
        Entity: {
          Id: match.params.id,
        },
        EntityType: "Organization",
        Status: statusToBe,
        Type: "General",
        Attachments: files.map((file) => {
          return { Url: file.file };
        }),
        Note: state.Note,
      },
    });
  };
  const handleChange = (event) => {
    console.log(event.target.name);
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSelectMember = ({ value, label, name }) => {
    setState({ ...state, [name]: { value, label } });
  };
  const mappedModerators = moderators.map((item) => {
    return { value: item.Member.Id, label: item.Member.Name };
  });
  const { Note, Status } = state;
  return (
    <FormHolder>
      <span>{statusToBe}</span>
      {type && statusToBe === "ModeratorAssigned" ? (
        <Select
          className="dropdown"
          value={state.ModeratorAssigned}
          onChange={(item) =>
            handleSelectMember({ ...item, name: "ModeratorAssigned" })
          }
          placeholder={"Select Moderator"}
          options={mappedModerators}
        />
      ) : null}
      {/* <select value={state.Status} name='Status' onChange={(event) => handleChange(event)} >
                {
                    Object.keys(statuses).map(key => {
                        return (
                            <option key={key} value={key}>{key}</option>
                        )
                    })
                }
            </select> */}
      <input
        className="reply"
        placeholder="Reply"
        type="text"
        onChange={handleChange}
        name="Note"
        value={Note}
      />
      <div className="attachment-holder">
        <UploaderComponent title="Upload Photos" />
        <div className="files-holder">
          {files.map((f) => {
            return (
              <div key={f.file} className="inline-tr">
                <img src={baseUrl + "/" + f.file} alt="File" />
                <input
                  name={`naam-${f.file}`}
                  type="text"
                  onChange={(e) => handleChange(e, f)}
                  placeholder="Name"
                />
                <textarea
                  name={`kaam-${f.file}`}
                  onChange={(e) => handleChange(e, f)}
                  className="note"
                ></textarea>
              </div>
            );
          })}
        </div>
      </div>
      <button className="submit" onClick={handleClick}>
        Add Replies
      </button>
    </FormHolder>
  );
};
const mapState = (state) => {
  const { request, upload, organization } = state;
  return {
    files: upload.files,
    statusToBe: request.statusToBe,
    moderators: organization.moderatorsForDD,
    type: request.type,
  };
};
export default connect(mapState)(RequestAdder);
