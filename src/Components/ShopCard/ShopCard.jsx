import React from "react";
import "./ShopCard.scss";
import { connect } from "react-redux";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import EditIcon from "@rsuite/icons/Edit";
import {
  Modal,
  Button,
  SelectPicker,
  DatePicker,
  Form,
  Notification,
  toaster
} from "rsuite";
import { deleteShop, editShop } from "../../Redux/ShopData/ShopData.actions";
var status;
class ShopCard extends React.Component {
  constructor() {
    super();
    this.state = {
      editShopModal: false,
      area: "",
      name: "",
      category: "",
      startDate: "",
      endDate: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeArea = this.changeArea.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }
  openModal() {
    this.setState({ editShopModal: true });
  }
  closeModal() {
    this.setState({ editShopModal: false });
  }
  changeArea(item) {
    this.setState({ area: item });
  }
  changeCategory(item) {
    this.setState({ category: item });
  }
  render() {
    const now = new Date();
    if (
      now.getTime() <= this.props.shopData.endDate.getTime() &&
      now.getTime() >= this.props.shopData.startDate.getTime()
    ) {
      status = "Open";
    } else {
      status = "Closed";
    }
    return (
      <div class="column">
        <div class="card">
          <h3>{this.props.shopData.name}</h3>
          <p>{this.props.shopData.category}</p>
          <p>{this.props.shopData.area}</p>
          <p>{status}</p>
          <hr />
          <button
            className="delete_btn"
            onClick={() => {
              this.props.deleteShop(this.props.shopData);
            }}
          >
            <CloseOutlineIcon style={{ fontSize: 19 }} />
          </button>
          &nbsp;&nbsp;
          <button
            className="delete_btn editbtn"
            onClick={() => {
              this.openModal();
              this.setState({
                name: this.props.shopData.name,
                area: this.props.shopData.area,
                category: this.props.shopData.category,
                startDate: this.props.shopData.startDate,
                endDate: this.props.shopData.endDate
              });
            }}
          >
            <EditIcon style={{ fontSize: 19 }} />
          </button>
        </div>

        {/* edit modal */}
        <Modal
          backdrop={true}
          open={this.state.editShopModal}
          onClose={this.closeModal}
        >
          <Modal.Header>
            <Modal.Title>Edit Shop</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.ControlLabel>Name of Shop </Form.ControlLabel>
                <Form.Control
                  value={this.state.name}
                  name="name"
                  style={{ width: 284 }}
                  onChange={(value) => {
                    this.setState({ name: value });
                  }}
                />
              </Form.Group>
              <label>Category: </label>
              <SelectPicker
                value={this.state.category}
                data={[
                  { label: "Grocery", value: "Grocery" },
                  { label: "Butcher", value: "Butcher" },
                  { label: "Baker", value: "Baker" },
                  { label: "Chemist", value: "Chemist" },
                  { label: "Stationery shop", value: "Stationery shop" }
                ]}
                style={{ width: 224 }}
                onSelect={this.changeCategory}
              />
              <br />
              <br />
              <label>Area: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <SelectPicker
                value={this.state.area}
                data={[
                  { label: "Thane", value: "Thane" },
                  { label: "Pune", value: "Pune" },
                  { label: "Mumbai Suburban", value: "Mumbai Suburban" },
                  { label: "Nashik", value: "Nashik" },
                  { label: "Nagpur", value: "Nagpur" },
                  { label: "Ahmednagar", value: "Ahmednagar" },
                  { label: "Solapur", value: "Solapur" }
                ]}
                style={{ width: 224 }}
                onSelect={this.changeArea}
              />
              <br />
              <br />
              <label>Start Date: </label>
              <DatePicker
                placeholder="Select Date"
                placement="auto"
                style={{ width: 220 }}
                onChange={(date) => {
                  this.setState({ startDate: date });
                }}
              />
              <br />
              <br />
              <label>End Date: </label>
              <DatePicker
                placeholder="Select Date"
                placement="auto"
                style={{ width: 220 }}
                onChange={(date) => {
                  this.setState({ endDate: date });
                }}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                if (
                  this.state.name === "" ||
                  this.state.area === "" ||
                  this.state.cataegory === "" ||
                  this.state.endDate === "" ||
                  this.state.startDate === ""
                ) {
                  toaster.push(
                    <Notification>Some Field are Blank</Notification>
                  );
                  return;
                } else if (
                  this.state.startDate.getTime() > this.state.endDate.getTime
                ) {
                  toaster.push(
                    <Notification>start Date is after end Date</Notification>
                  );
                  return;
                }
                this.closeModal();
                this.props.editShop(this.props.shopData, {
                  name: this.state.name,
                  area: this.state.area,
                  category: this.state.category,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate
                });
              }}
              appearance="primary"
            >
              Save Edit
            </Button>
            <Button onClick={this.closeModal} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  shops: state.shopData.shops
});

const mapDispatchToProps = (dispatch) => ({
  deleteShop: (shopData) => dispatch(deleteShop(shopData)),
  editShop: (currentData, newData) => dispatch(editShop(currentData, newData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCard);
