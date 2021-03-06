import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import DataTable from "../table/DataTable/DataTable";
import {TitleWithAction, FormHolder} from "./organization.styles";
import Modal from "../modal/modal.component";
import UploaderComponent from "../uploader/uploader.component";
import UploadedComponent from "../uploader/uploaded.component";
import UomInput from "../uom/uom.overview";
import Pagination from "react-js-pagination";
import {fetchUomStart} from "../../../common/redux/uom/uom.actions";
import ItemWithQtySelector from "../item/item.withqty.selector";

const OrganizationPackages = ({
  packages,
  organizations,
  dispatch,
  organization,
  fetchUomStart,
  modal,
  activePage,
  totalItemsCount,
  pageRangeDisplayed,
  itemsCountPerPage,
}) => {
  useEffect(() => {
    fetchUomStart();
  }, [fetchUomStart]);
  const [state, setState] = useState({
    addedItems: {},
    modal: false,
    Name: "",
    NativeName: "",
    Description: "",
    Worth: "",
    DefaultUOM: "",
  });
  //let history = useHistory();

  const mappedData = packages.map((request) => {
    return {
      Name: request.Item.Name,
      NativeName: request.Item.NativeName,
      Description: request.Item.Description,
    };
  });

  const columns = [
    {
      name: "Name",
      selector: "Name",
      sortable: true,
    },
    {
      name: "NativeName",
      selector: "NativeName",
      sortable: true,
    },
  ];
  const openModal = () => {
    dispatch({type: "OPEN_MODAL", payload: {}});
    //setState({ ...state, modal: true });
  };
  const closeModal = () => {
    dispatch({type: "CLOSE_MODAL", payload: {}});
    //setState({ ...state, modal: false });
  };
  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  };
  const handleSubmit = () => {
    const form = {...state};
    delete form["modal"];
    delete form["addedItems"];

    dispatch({
      type: "ADD_ORG_PACKAGE_START",
      payload: {
        ...form,
        Organization: organization,
        Items: Object.keys(state.addedItems).map((key) => {
          return {
            Item: {Id: key},
            ItemQuantity: state.addedItems[key].ItemQuantity,
            ItemUOM: state.addedItems[key].ItemUOM,
          };
        }),
      },
    });
  };
  const handleUom = (item) => {
    setState({...state, DefaultUOM: item});
  };
  const {
    Name,
    NativeName,
    Worth,
    Description,
    DefaultUOM,
    ImageUrl,
    ImageInBase64,
  } = state;
  const handleAdd = (input) => {
    setState({
      ...state,
      addedItems: {
        ...state.addedItems,
        [input.Item.Id]: {
          Item: input.Item,
          ItemQuantity: input.ItemQuantity,
          ItemUOM: input.ItemUOM,
        },
      },
    });
  };
  const handleRemove = (item) => {
    //console.log(item,state.addedItems);
    const filteredKeys = state.addedItems;
    delete filteredKeys[item.Id];
    setState({
      ...state,
      addedItems: {...filteredKeys},
    });
  };
  const handlePageChange = (page) => {
    dispatch({
      type: "FETCH_ORG_PACKAGES_START",
      payload: organization.Id,
      params: {
        activePage: page,
        totalItemsCount,
        pageRangeDisplayed,
        itemsCountPerPage,
      },
    });
  };
  return (
    <>
      <TitleWithAction>
        <h2>{organization ? organization.Name : null} Packages</h2>
        <button onClick={openModal}>Add a package</button>
      </TitleWithAction>
      <div className="modal-holder">
        {modal ? (
          <Modal closeModal={closeModal}>
            <h2>Add Organization Package</h2>
            <FormHolder>
              <div className="two-panel">
                <div className="uploader">
                  <UploadedComponent logo />
                  <UploaderComponent title="Add Logo" type="file" item="1" />
                </div>
                <div className="input-holder">
                  <input
                    placeholder="Name"
                    type="text"
                    onChange={handleChange}
                    name="Name"
                    value={Name}
                  />
                  <input
                    placeholder="Native Name"
                    type="text"
                    onChange={handleChange}
                    name="NativeName"
                    value={NativeName}
                  />
                  <input
                    placeholder="Total Worth"
                    type="text"
                    onChange={handleChange}
                    name="Worth"
                    value={Worth}
                  />
                  <UomInput name="DefaultUOM" onSelect={handleUom} />
                  <textarea
                    placeholder="Description"
                    type="text"
                    onChange={handleChange}
                    name="Description"
                    value={Description}
                  ></textarea>
                  <div className="ml-2">
                    <ItemWithQtySelector
                      handleAdd={handleAdd}
                      handleRemove={handleRemove}
                      addedItems={state.addedItems}
                    />
                  </div>
                  <button className="btn btn-success" onClick={handleSubmit}>
                    Add Package
                  </button>
                </div>
              </div>
            </FormHolder>
          </Modal>
        ) : null}
      </div>
      <div className="table">
        <DataTable noHeader columns={columns} data={mappedData} />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange.bind(this)}
        />
      </div>
    </>
  );
};
const mapState = (state) => {
  const {organization} = state;
  return {
    packages: organization.packages,
    organizations: organization.organizations,
    organization: organization.current,
    items: organization.items,
    modal: organization.form.modal,
    activePage:
      organization && organization.activePage ? organization.activePage : 0,
    totalItemsCount:
      organization && organization.totalItemsCount
        ? organization.totalItemsCount
        : 0,
    itemsCountPerPage:
      organization && organization.itemsCountPerPage
        ? organization.itemsCountPerPage
        : 0,
    pageRangeDisplayed:
      organization && organization.pageRangeDisplayed
        ? organization.pageRangeDisplayed
        : 0,
  };
};
const mapDispatch = (dispatch) => ({
  fetchUomStart: () => dispatch(fetchUomStart()),
});
export default connect(mapState, mapDispatch)(OrganizationPackages);
