import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import DataTable from "../table/DataTable/DataTable";
import {TitleWithAction, FormHolder} from "./campaign.styles";
import Modal from "../modal/modal.component";
import UploaderComponent from "../uploader/uploader.component";
import UploadedComponent from "../uploader/uploaded.component";
import UomInput from "../uom/uom.overview";
import Pagination from "react-js-pagination";
import {fetchUomStart} from "../../../common/redux/uom/uom.actions";
import ItemWithQtySelector from "../item/item.withqty.selector";

const CampaignPackages = ({
  packages,
  campaigns,
  dispatch,
  campaign,
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
      type: "ADD_CAMPAIGN_PACKAGE_START",
      payload: {
        ...form,
        Campaign: campaign,
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
      type: "FETCH_CAMPAIGN_PACKAGES_START",
      payload: campaign.Id,
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
        <h2>{campaign ? campaign.Name : null} Packages</h2>
        <button onClick={openModal}>Add a package</button>
      </TitleWithAction>
      <div className="modal-holder">
        {modal ? (
          <Modal closeModal={closeModal}>
            <h2>Add Campaign Package</h2>
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
  const {campaign} = state;
  return {
    packages: campaign.packages,
    campaigns: campaign.campaigns,
    campaign: campaign.current,
    items: campaign.items,
    modal: campaign.form.modal,
    activePage:
      campaign && campaign.activePage ? campaign.activePage : 0,
    totalItemsCount:
      campaign && campaign.totalItemsCount
        ? campaign.totalItemsCount
        : 0,
    itemsCountPerPage:
      campaign && campaign.itemsCountPerPage
        ? campaign.itemsCountPerPage
        : 0,
    pageRangeDisplayed:
      campaign && campaign.pageRangeDisplayed
        ? campaign.pageRangeDisplayed
        : 0,
  };
};
const mapDispatch = (dispatch) => ({
  fetchUomStart: () => dispatch(fetchUomStart()),
});
export default connect(mapState, mapDispatch)(CampaignPackages);
