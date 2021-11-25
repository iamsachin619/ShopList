import "./styles.css";
import React from "react";
import { connect } from "react-redux";
import ShopCard from "./Components/ShopCard/ShopCard";
import {
  Modal,
  Button,
  SelectPicker,
  DatePicker,
  Form,
  Notification,
  toaster
} from "rsuite";
import { addShop } from "./Redux/ShopData/ShopData.actions";
import alertify from "alertifyjs";
import "alertifyjs/build/css/themes/semantic.min.css";
var categorically, AreaWise, statWise;
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      AddNewShopModal: false,
      area: "",
      name: "",
      category: "",
      startDate: "",
      endDate: "",
      filterCategory: "",
      filterArea: "",
      filterStatus: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeArea = this.changeArea.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeFArea = this.changeFArea.bind(this);
    this.changeFCategory = this.changeFCategory.bind(this);
    this.changeFStatus = this.changeFStatus.bind(this);
  }

  openModal() {
    this.setState({ AddNewShopModal: true });
  }
  closeModal() {
    this.setState({ AddNewShopModal: false });
  }
  changeArea(item) {
    this.setState({ area: item });
  }
  changeCategory(item) {
    this.setState({ category: item });
  }
  changeFArea(item) {
    this.setState({ filterArea: item });
  }
  changeFCategory(item) {
    this.setState({ filterCategory: item });
  }
  changeFStatus(item) {
    this.setState({ filterStatus: item });
  }

  render() {
    let arrOfShops = this.props.shops;

    if (this.state.filterCategory === "") {
      categorically = arrOfShops;
    } else {
      categorically = [];
      arrOfShops.map((shop) => {
        if (shop.category === this.state.filterCategory) {
          categorically.push(shop);
        }
        return;
      });
    }
    if (this.state.filterArea === "") {
      AreaWise = categorically;
    } else {
      AreaWise = [];
      categorically.map((shop) => {
        if (shop.area === this.state.filterArea) {
          AreaWise.push(shop);
        }
      });
    }

    if (this.state.filterStatus === "") {
      statWise = AreaWise;
    } else {
      statWise = [];
      if (this.state.filterStatus === "Open") {
        AreaWise.map((shop) => {
          const now = new Date();

          if (
            shop.endDate.getTime() >= now.getTime() &&
            shop.startDate <= now.getTime()
          ) {
            statWise.push(shop);
          }
        });
      } else if (this.state.filterStatus === "Close") {
        AreaWise.map((shop) => {
          const now = new Date();

          if (
            shop.endDate.getTime() <= now.getTime() ||
            shop.startDate >= now.getTime()
          ) {
            statWise.push(shop);
          }
        });
      }
    }

    return (
      <div className="App">
        <h1>Shop List</h1>
        <button
          className="addNewShopBtn"
          onClick={() => {
            this.openModal();
            this.setState({
              name: "",
              area: "",
              category: "",
              startDate: "",
              endDate: ""
            });
          }}
        >
          +
        </button>
        <hr />

        <label>Category: </label>
        <SelectPicker
          value={this.state.filterCategory}
          onClean={() => {
            this.setState({ filterCategory: "" });
          }}
          data={[
            { label: "Grocery", value: "Grocery" },
            { label: "Butcher", value: "Butcher" },
            { label: "Baker", value: "Baker" },
            { label: "Chemist", value: "Chemist" },
            { label: "Stationery shop", value: "Stationery shop" }
          ]}
          style={{ width: 224 }}
          onSelect={this.changeFCategory}
        />
        <br />
        <br />

        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Area: </label>
        <SelectPicker
          onClean={() => {
            this.setState({ filterArea: "" });
          }}
          value={this.state.filterArea}
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
          onSelect={this.changeFArea}
        />
        <br />
        <br />
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status: </label>

        <SelectPicker
          value={this.state.filterStatus}
          onClean={() => {
            this.setState({ filterStatus: "" });
          }}
          data={[
            { label: "Open", value: "Open" },
            { label: "Close", value: "Close" }
          ]}
          style={{ width: 224 }}
          onSelect={this.changeFStatus}
        />
        <hr />

        {/* list */}
        {this.props.shops
          ? statWise.map((shop, index) => {
              return <ShopCard shopData={shop} key={index} />;
            })
          : "No Shops"}
        {/* modal to add shops */}
        <Modal
          backdrop={true}
          open={this.state.AddNewShopModal}
          onClose={this.closeModal}
        >
          <Modal.Header>
            <Modal.Title>Add New Shop</Modal.Title>
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
                this.props.addShop({
                  name: this.state.name,
                  area: this.state.area,
                  category: this.state.category,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate
                });
              }}
              appearance="primary"
            >
              Add Shop
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
  addShop: (ShopData) => dispatch(addShop(ShopData))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
