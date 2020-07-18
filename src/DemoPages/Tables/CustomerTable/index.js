import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,CardTitle,Form,FormGroup,Label,Container,Input, FormFeedback, FormText,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,  TabContent, TabPane,
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import {makeData} from "./utils";
import ReactTable from "react-table";
import filterFactory, {textFilter,selectFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Center from 'react-center';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import ShirtGrid from './ShirtGrid';
import PantsGrid from './PantsGrid';
import JubbaGrid from './JubbaGrid';
import ChudidarGrid from './ChudidarGrid';
import SalwarGrid from './SalwarGrid';
import SafariGrid from './SafariGrid';
import SuitGrid from './SuitGrid';
import WaistcoatGrid from './WaistcoatGrid';
import JodhpuriGrid from './JodhpuriGrid';

import CustomDatePicker from './CustomDatePicker';
import CustomDateTimePicker from './CustomDateTimePicker';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3001';
const get_items_url = `${API_URL}/booking/getitems`;
const get_item_grid_column_url = `${API_URL}/booking/getitem_measurements/`;
const create_booking_url = `${API_URL}/booking/create`;
const search_customer_url = `${API_URL}/customer/search_customer`

const { SearchBar } = Search;

const products = [
    {
        id: 'M121',
        name: 'subhan',
        contact: '9032222245',
        status:'1 - Shirt Pending with Manju, \
         1 - Trouser Pending with Raja,\
         1 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  1 , Blazer - 1 ',
        vipFlag:'0'
    },
    {
        id: 'M122',
        name: 'abdul',
        contact: '9032222236',
        status:'1 - Shirt Pending with Manju, \
         2 - Trouser Pending with Raja,\
         4 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  2 , Blazer - 4 ',
        vipFlag:'0'
    },
    {
        id: 'D123',
        name: 'abdul',
        contact: '9032222236',
        status:'1 - Shirt Pending with Manju, \
         2 - Trouser Pending with Raja,\
         4 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  2 , Blazer - 4 ',
        vipFlag:'1'
    },
    {
        id: 'M125',
        name: 'shaheena',
        contact: '9032222945',
        status:'9 - Shirt Pending with Manju, \
         6 - Trouser Pending with Raja,\
         8 - Blazer Pending with Su',
        total:'Shirt - 9 , Trousers -  6 , Blazer - 8 ',
        vipFlag:'1'
    },
    {
        id: 'D124',
        name: 'abdul',
        contact: '9032222236',
        status:'1 - Shirt Pending with Manju, \
         2 - Trouser Pending with Raja,\
         4 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  2 , Blazer - 4 ',
        vipFlag:'1'
    },
    {
        id: 'M125',
        name: 'shaheena',
        contact: '9032222945',
        status:'9 - Shirt Pending with Manju, \
         6 - Trouser Pending with Raja,\
         8 - Blazer Pending with Su',
        total:'Shirt - 9 , Trousers -  6 , Blazer - 8 ',
        vipFlag:'1'
    },{
        id: 'D126',
        name: 'abdul',
        contact: '9032222236',
        status:'1 - Shirt Pending with Manju, \
         2 - Trouser Pending with Raja,\
         4 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  2 , Blazer - 4 ',
        vipFlag:'1'
    },
    {
        id: 'M127',
        name: 'shaheena',
        contact: '9032222945',
        status:'9 - Shirt Pending with Manju, \
         6 - Trouser Pending with Raja,\
         8 - Blazer Pending with Su',
        total:'Shirt - 9 , Trousers -  6 , Blazer - 8 ',
        vipFlag:'1'
    },
    {
        id: 'D128',
        name: 'abdul',
        contact: '9032222236',
        status:'1 - Shirt Pending with Manju, \
         2 - Trouser Pending with Raja,\
         4 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  2 , Blazer - 4 ',
        vipFlag:'1'
    },
    {
        id: 'M129',
        name: 'shaheena',
        contact: '9032222945',
        status:'9 - Shirt Pending with Manju, \
         6 - Trouser Pending with Raja,\
         8 - Blazer Pending with Su',
        total:'Shirt - 9 , Trousers -  6 , Blazer - 8 ',
        vipFlag:'1'
    },
    {
        id: 'D12',
        name: 'abdul',
        contact: '9032222236',
        status:'1 - Shirt Pending with Manju, \
         2 - Trouser Pending with Raja,\
         4 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  2 , Blazer - 4 ',
        vipFlag:'1'
    },
    {
        id: 'M125',
        name: 'shaheena',
        contact: '9032222945',
        status:'9 - Shirt Pending with Manju, \
         6 - Trouser Pending with Raja,\
         8 - Blazer Pending with Su',
        total:'Shirt - 9 , Trousers -  6 , Blazer - 8 ',
        vipFlag:'1'
    },

];


const selectOptions = {
  0: 'VIP',
  1: 'Non VIP',
};

const columns = [
    {
        dataField: 'id',
        text: 'Customer ID',
        sort: true,
      //  filter: textFilter()
    },
    {
        dataField: 'name',
        text: 'Customer Name',
        sort: true,
      //  filter: textFilter()
    },
    {
        dataField: 'contact',
        text: 'Contact#',
        sort: true,
        align: 'center',
      //  filter: textFilter()
    },
    {
        dataField: 'total',
        isDummyField: false,
        align: 'center',
        text: 'Total Quantity',
    },
    {
        dataField: 'contact',
        text: 'Contact#',
        sort: true,
        align: 'center',
      //  filter: textFilter()
    },
    {
        dataField: 'vipFlag',
        isDummyField: false,
        align: 'center',
        text: 'VIP/Non VIP',
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
        options: selectOptions
  })
    }

];

const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
}];


const rowEventsProp = {
  onClick: (e, row, rowIndex) => {
    let rowStr = '';
    for (const prop in row) {
      rowStr += prop + ': "' + row[prop] + '"';
    }
    alert(rowStr)
  },

};


export default class BookingTable extends React.Component {

   selectedRow :[]
   nestedModal : false
    constructor(props) {
        super(props);
        this.state = {
          activeTab: '1',
          modal:false,
          selectedRow:[],
          rowNumber:12,
          item_tabs:[],
          nestedModal: false,
          Shirt_grid_items:[],
          Pants_grid_items:[],
          Jubba_grid_items:[],
          Chudidar_grid_items:[],
          Salwar_grid_items:[],
          Safari_grid_items:[],
          Suit_grid_items:[],
          Waistcoat_grid_items:[],
          Jodhpuri_grid_items:[],


          Shirt_non_grid_items:[],
          Pants_non_grid_items:[],
          Jubba_non_grid_items:[],
          Chudidar_non_grid_items:[],
          Salwar_non_grid_items:[],
          Safari_non_grid_items:[],
          Suit_non_grid_items:[],
          Waistcoat_non_grid_items:[],
          Jodhpuri_non_grid_items:[],


          customer_details : {customer_address:"ANANTAPUR",local_nonlocal_flag:false,vip_nonvip_flag:false},
          booking_details : {booking_type:"Casual",priority_flag:false,booking_status:"Created"},
          booking_item_details : [],
          customer_measurements:{measurements:[]},
          data: makeData()
        };

        //Booking References
        this.BookingDate_Reference = React.createRef();
        this.DeliveryDate_Reference = React.createRef();
        this.Delivery_Time_Reference = React.createRef();
        //GRID References
        this.Shirt_Reference = React.createRef();
        this.Pants_Reference = React.createRef();
        this.Jubba_Reference = React.createRef();
        this.Chudidar_Reference = React.createRef();
        this.Salwar_Reference = React.createRef();
        this.Safari_Reference = React.createRef();
        this.Suit_Reference = React.createRef();
        this.Waistcoat_Reference = React.createRef();
        this.Jodhpuri_Reference = React.createRef();




        this.toggle = this.toggle.bind(this);

        //Booking Details
        this.handleBookingTypeChange = this.handleBookingTypeChange.bind(this);
        this.saveBookingDetails = this.saveBookingDetails.bind(this);
        this.handleBookingPriorityFlagChange = this.handleBookingPriorityFlagChange.bind(this);
        this.handleBookingDeliveredToChange = this.handleBookingDeliveredToChange.bind(this);
        this.handleBookingStatusChange = this.handleBookingStatusChange.bind(this);
        this.handleBookingQuantityChange = this.handleBookingQuantityChange .bind(this);
        this.handleBookingActionChange = this.handleBookingActionChange.bind(this);
        this.fetch_booking_details = this.fetch_booking_details.bind(this);
        this.fetch_booking_item_details = this.fetch_booking_item_details.bind(this);

        //Customer Field Changes
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
        this.handleCustomerContactChange = this.handleCustomerContactChange.bind(this);
        this.handleCustomerAddressChange = this.handleCustomerAddressChange.bind(this);
        this.handleCustomerVIPChange = this.handleCustomerVIPChange.bind(this);
        this.handleCustomerLocalChange = this.handleCustomerLocalChange.bind(this);
        this.fetch_customer_measurement_details = this.fetch_customer_measurement_details.bind(this)

        //this.renderEditable = this.renderEditable.bind(this);
        this.populateItemTab = this.populateItemTab.bind(this);
    }

    handleCustomerNameChange(event){
      const customer = this.state.customer_details
      customer["customer_name"] = event.target.value
      this.setState({customer_details: customer});
    }

    handleCustomerAddressChange(event){
      const customer = this.state.customer_details
      customer["customer_address"] = event.target.value
      this.setState({customer_details: customer});
    }

    handleCustomerContactChange(event){

      const customer = this.state.customer_details

      const finalURL = search_customer_url + "/" + event.target.value

        axios({
        method: 'get',
        url: finalURL,
        })
      .then((response) =>  {

          var customer_info = response.data.customer_info

          if (customer_info["customer_name"] === undefined){
            customer["customer_name"] = ""
          }else{
            customer["customer_name"] = customer_info["customer_name"]
          }

          this.setState({customer_details: customer});

          if (customer_info["customer_address"] === undefined){
            customer["customer_address"] = "ANANTAPUR"
          }else{
            customer["customer_address"] = customer_info["customer_address"]
          }

          this.setState({customer_details: customer});

          if (customer_info["customer_id"] === undefined){
            customer["customer_id"] = ""
          }else{
            customer["customer_id"] = customer_info["customer_id"]
          }

          this.setState({customer_details: customer});

          if (customer_info["vip_nonvip_flag"] === undefined){
            customer["vip_nonvip_flag"] = false
          }else if (customer_info["vip_nonvip_flag"] == 1){
            customer["vip_nonvip_flag"] = true
          }

          this.setState({customer_details: customer});

          if (customer_info["local_nonlocal_flag"] === undefined){
            customer["local_nonlocal_flag"] = false
          }
          else if (customer_info["local_nonlocal_flag"] == 1){
            customer["local_nonlocal_flag"] = true
          }

          this.setState({customer_details: customer});

          customer["customer_contact"] = event.target.value
          this.setState({customer_details: customer});

      })
      .catch(function (error) {
        console.log(error);
      })

      customer["customer_contact"] = event.target.value
      this.setState({customer_details: customer});

    }

    handleCustomerVIPChange(event){
      const customer = this.state.customer_details
    	customer["vip_nonvip_flag"] = event.target.checked
      this.setState({customer_details: customer});
    }

    handleCustomerLocalChange(event){
      const customer = this.state.customer_details
    	customer["local_nonlocal_flag"] = event.target.checked
      this.setState({customer_details: customer});
    }
    /*
    renderEditable(cellInfo) {
        return (
            <div
                style={{backgroundColor: "#fafafa",textAlign: "center" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {

                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({data});

                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }
    */
    populateItemTab(items){

        axios({
          method: 'get',
          url: get_items_url,
          })
        .then((response) =>  {
            this.setState({item_tabs: response.data.items})
            response.data.items.map((item_type, index) =>
            this.populateItem_Measurement_Grid_Columns(item_type)
          );
        })
        .catch(function (error) {
          console.log(error);
        })
  }
    populateItem_Measurement_Grid_Columns(measurement_category){

      var finalURL = get_item_grid_column_url + measurement_category

      var column_data = []
      var non_grid_column_data = []

      axios({
        method: 'get',
        url: finalURL,
        })
      .then((response) =>  {

        response.data.grid_data.map((measurement_data, index) =>
          column_data.push({Header:measurement_data.Header,Cell:this.renderEditable, accessor: measurement_data.accessor,measurment_code:measurement_data.measurment_code})
        );

        response.data.non_grid_data.map((measurement_data, index) =>
          non_grid_column_data.push({Header:measurement_data.Header,Cell:this.renderEditable, accessor: measurement_data.accessor,measurment_code:measurement_data.measurment_code})
        );

         switch (measurement_category) {
           case "Shirt": this.setState({Shirt_grid_items: column_data,Shirt_non_grid_items: non_grid_column_data})
           case "Pant": this.setState({Pants_grid_items: column_data,Pants_non_grid_items: non_grid_column_data})
           case "Jubba": this.setState({Jubba_grid_items: column_data,Jubba_non_grid_items: non_grid_column_data})
           case "Chuddidar": this.setState({Chudidar_grid_items: column_data,Chudidar_non_grid_items: non_grid_column_data})
           case "Salwar": this.setState({Salwar_grid_items: column_data,Salwar_non_grid_items: non_grid_column_data})
           case "Safari": this.setState({Safari_grid_items: column_data,Safari_non_grid_items: non_grid_column_data})
           case "Suit": this.setState({Suit_grid_items: column_data,Suit_non_grid_items: non_grid_column_data})
           case "Waistcoat": this.setState({Waistcoat_grid_items: column_data,Waistcoat_non_grid_items: non_grid_column_data})
           case "Jodhpuri": this.setState({Jodhpuri_grid_items: column_data,Jodhpuri_non_grid_items: non_grid_column_data})

         }
      })
      .catch(function (error) {
        console.log(error);

      })

    }


    componentDidMount=()=> {
      this.populateItemTab()
    }

    onRowSelect(event,row,rowIndex){
        this.selectedRow = row
        this.nestedModal = true
        this.setState(previousState => ({modal:!previousState.modal }))
    }

    toggle() {

      this.setState({
          modal: !this.state.modal
      });
    }

    fetch_booking_details(){

      const booking_details = this.state.booking_details
      booking_details["booking_date"]= this.BookingDate_Reference.current.state.startDate
      booking_details["delivery_date"]= this.DeliveryDate_Reference.current.state.startDate
      booking_details["delivery_time"]= this.Delivery_Time_Reference.current.state.startDate

      this.setState({
          booking_details: booking_details
      });

    }

    fetch_booking_item_details(){

      var booking_qty = 0

      const booking_details = this.state.booking_details

      const booking_item_details = this.state.booking_item_details
      const Shirt_Reference = this.Shirt_Reference.current;
      const Pants_Reference = this.Pants_Reference.current;
      const Jubba_Reference = this.Jubba_Reference.current;
      const Chudidar_Reference = this.Chudidar_Reference.current;
      const Salwar_Reference = this.Salwar_Reference.current;
      const Safari_Reference = this.Safari_Reference.current;
      const Waistcoat_Reference = this.Waistcoat_Reference.current;
      const Jodhpuri_Reference = this.Jodhpuri_Reference.current;


      if(Shirt_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Shirt_Reference.state.item_details.item_qty
        booking_item_details.push(Shirt_Reference.state.item_details)
      }

      if(Pants_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Pants_Reference.state.item_details.item_qty
        booking_item_details.push(Pants_Reference.state.item_details)
      }

      if(Jubba_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Jubba_Reference.state.item_details.item_qty
        booking_item_details.push(Jubba_Reference.state.item_details)
      }

      if(Chudidar_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Chudidar_Reference.state.item_details.item_qty
        booking_item_details.push(Chudidar_Reference.state.item_details)
      }

      if(Salwar_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Salwar_Reference.state.item_details.item_qty
        booking_item_details.push(Salwar_Reference.state.item_details)
      }

      if(Safari_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Safari_Reference.state.item_details.item_qty
        booking_item_details.push(Safari_Reference.state.item_details)
      }

      /*
      if(Waistcoat_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Waistcoat_Reference.state.item_details.item_qty
        booking_item_details.push(Waistcoat_Reference.state.item_details)
      }

      if(Jodhpuri_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Jodhpuri_Reference.state.item_details.item_qty
        booking_item_details.push(Jodhpuri_Reference.state.item_details)
      }

      if(Weddingcollection_Reference.state.item_details.item_qty > 0){
        booking_qty = booking_qty + Weddingcollection_Reference.state.item_details.item_qty
        booking_item_details.push(Weddingcollection_Reference.state.item_details)
      }
      */
      booking_details["booking_quantity"]= booking_qty

      this.setState({
          booking_item_details: booking_item_details,
          booking_details:booking_details
      });

    }

    fetch_customer_measurement_details(){

      const customer_measurements_deatils = this.state.customer_measurements

      const Shirt_Reference = this.Shirt_Reference.current;
      const Pants_Reference = this.Pants_Reference.current;
      const Jubba_Reference = this.Jubba_Reference.current;
      const Chudidar_Reference = this.Chudidar_Reference.current;
      const Salwar_Reference = this.Salwar_Reference.current;
      const Safari_Reference = this.Safari_Reference.current;
      const Waistcoat_Reference = this.Waistcoat_Reference.current;
      const Jodhpuri_Reference = this.Jodhpuri_Reference.current;


      if(Shirt_Reference.state.item_details.item_qty > 0){
        Shirt_Reference.fetch_measurement_details()
        customer_measurements_deatils.measurements = Shirt_Reference.state.measurement_data
      }

      if(Pants_Reference.state.item_details.item_qty > 0){
        Pants_Reference.fetch_measurement_details()
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Pants_Reference.state.measurement_data]
      }

      if(Jubba_Reference.state.item_details.item_qty > 0){
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Jubba_Reference.state.measurement_data]
      }

      if(Chudidar_Reference.state.item_details.item_qty > 0){
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Chudidar_Reference.state.measurement_data]
      }

      if(Salwar_Reference.state.item_details.item_qty > 0){
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Salwar_Reference.state.measurement_data]
      }

      if(Safari_Reference.state.item_details.item_qty > 0){
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Safari_Reference.state.measurement_data]
      }

      /*
      if(Waistcoat_Reference.state.item_details.item_qty > 0){
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Waistcoat_Reference.state.measurement_data]
      }

      if(Jodhpuri_Reference.state.item_details.item_qty > 0){
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Jodhpuri_Reference.state.measurement_data]
      }

      if(Weddingcollection_Reference.state.item_details.item_qty > 0){
        customer_measurements_deatils.measurements = [...customer_measurements_deatils.measurements,...Weddingcollection_Reference.state.measurement_data]
      }
      */
      this.setState(
        {
          customer_measurements:customer_measurements_deatils
        });

    }

    saveBookingDetails(){

      this.fetch_booking_details()

      this.fetch_booking_item_details()

      this.fetch_customer_measurement_details()

      var input_data = {customer_details:this.state.customer_details,booking_details:this.state.booking_details,booking_item_details:this.state.booking_item_details,customer_measurements:this.state.customer_measurements.measurements}

      axios({
      method: 'post',
      url: create_booking_url,
      data:input_data
      })
      .then((response) =>  {
           alert(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error);
      })

      this.setState({
          modal: !this.state.modal
      });

      this.setState({
          customer_details: {customer_address:"ANANTAPUR",local_nonlocal_flag:false,vip_nonvip_flag:false},
          booking_details:{booking_type:"Casual",priority_flag:false,booking_status:"Created"},
          booking_item_details:[],
          customer_measurements:{measurements:[]}
        })
    }

    toggleTab(tab) {
      if (this.state.activeTab !== tab) {
          this.setState({
              activeTab: tab
          });
      }
    }

    handleBookingTypeChange(e){
        const booking_details = this.state.booking_details;
        booking_details.booking_type = e.target.value;
        this.setState({booking_details:booking_details});
    }

    handleBookingPriorityFlagChange(e){
      const booking_details = this.state.booking_details;
      booking_details.priority_flag = e.target.checked;
      this.setState({booking_details:booking_details});
    }



    handleBookingDeliveredToChange(e){
      const booking_details = this.state.booking_details;
      booking_details.booking_delivered_to = e.target.value;
      this.setState({booking_details:booking_details});
    }

    handleBookingStatusChange(e){
      const booking_details = this.state.booking_details;
      booking_details.booking_status = e.target.value;
      this.setState({booking_details:booking_details});
    }

    handleBookingQuantityChange(e){
      const booking_details = this.state.booking_details;
      booking_details.booking_quantity = e.target.value;
      this.setState({booking_details:booking_details});
    }

    handleBookingActionChange(e){
      const booking_details = this.state.booking_details;
      booking_details.booking_action = e.target.value;
      this.setState({booking_details:booking_details});
    }

    render() {
    return (
        <Fragment>
        <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}>
        <Row>
        <Col md="16">

          <Card className="main-card mb-3">
  <CardBody style={{width:'1400px'}}>
                  <div className="table-responsive">

                  <ToolkitProvider
                      keyField="id"
                      data={ products }
                      columns={ columns }
                      search
                    >
                      {
                        props => (
                          <div>
                            <Center>

                            <Label  style={ { fontWeight: 'bold' ,fontSize: 19} }> Search Booking &nbsp;</Label>
                            <SearchBar { ...props.searchProps } />
                            </Center>
                            <BootstrapTable
                                bootstrap4
                                { ...props.baseProps }
                                keyField="id"
                                data={products}
                                rowEvents = {{ onClick:this.onRowSelect.bind(this) }}
                                columns={columns}
                                pagination={ paginationFactory() }
                                filter={filterFactory()}
                                defaultSorted={defaultSorted}
                            />
                          </div>
                        )
                      }
                    </ToolkitProvider>


                  </div>
              </CardBody>
          </Card>
        </Col>
        </Row>
        </ReactCSSTransitionGroup>

            <span className="d-inline-block mb-2 mr-2">
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Booking Details</ModalHeader>
              <ModalBody>
              <Container fluid>
                  <Card className="main-card mb-3">
                      <CardBody>
                          <Form>

                              <br/>
                              <FormGroup row>

                              <Label for="customer_id" sm={1.5}>Customer ID</Label>
                              &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;
                              <Col sm={2.5}>
                                  <Input type="text" name="customer_id" value={this.state.customer_details.customer_id} onChange={this.handleCustomerIDChange} id="booking_customer_id"
                                           placeholder="" disabled />
                              </Col>
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                  <Label for="customer_name" sm={1.5}>Customer Name</Label>
                                  &nbsp;&nbsp;
                                  <Col sm={2.5}>
                                      <Input type="text" name="customer_name" value ={this.state.customer_details.customer_name} onChange={this.handleCustomerNameChange} id="booking_customer_name"
                                               placeholder=""/>
                                  </Col>
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                   <Label for="customer_contact" sm={0.5}>Contact#</Label>
                                     &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;
                                   <Col sm={2.5}>
                                       <Input type="text" name="customer_contact" value ={this.state.customer_details.customer_contact} onChange={this.handleCustomerContactChange} id="booking_customer_contact"
                                              placeholder=""/>
                                   </Col>

                                   &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;
                                  </FormGroup>
                              <br/>

                              <FormGroup row>

                                  <Label for="address" sm={1.5}>Address</Label>
                                  &nbsp;&nbsp;  &nbsp;&nbsp;
                                  <Col sm={2.5}>
                                      <Input type="text" name="Address" id="booking_customer_address"
                                             placeholder="" value ={this.state.customer_details.customer_address} onChange={this.handleCustomerAddressChange}/>
                                  </Col>
                              </FormGroup>
                              <br/><br/>
                          </Form>
                          <div className="btn-actions-pane-right">
                              <Button size="sm" outline color="alternate"
                                      className={"btn-pill btn-wide " + classnames({active: this.state.activeTab === '1'})}
                                      onClick={() => {
                                          this.toggleTab('1');
                                      }}>Address</Button>

                                {this.state.item_tabs.map((tab_name, index) => (
                                  <Button id={index} size="sm" outline color="alternate"
                                          className={"btn-pill btn-wide " + classnames({active: this.state.activeTab === String(index + 2)})}
                                          onClick={() => {
                                              this.toggleTab(String(index+2));
                                          }}>{tab_name}</Button>
                                ))}

                          </div>
                          <br/>

                          <TabContent activeTab={this.state.activeTab}>

                              <TabPane tabId="2">
                                  <ShirtGrid ref={this.Shirt_Reference}  grid_data={this.state.data} grid_columns={this.state.Shirt_grid_items} non_grid_columns={this.state.Shirt_non_grid_items}  item_details={this.state.Shirt_item_details}/>
                              </TabPane>

                              <TabPane tabId="3">
                                <PantsGrid ref={this.Pants_Reference}  grid_data={this.state.data} grid_columns={this.state.Pants_grid_items} non_grid_columns={this.state.Pants_non_grid_items}/>
                              </TabPane>

                              <TabPane tabId="4">
                                <JubbaGrid ref={this.Jubba_Reference}  grid_data={this.state.data} grid_columns={this.state.Jubba_grid_items} non_grid_columns={this.state.Jubba_non_grid_items}/>
                              </TabPane>

                              <TabPane tabId="5">
                                <ChudidarGrid ref={this.Chudidar_Reference}  grid_data={this.state.data} grid_columns={this.state.Chudidar_grid_items} non_grid_columns={this.state.Chudidar_non_grid_items}/>
                              </TabPane>

                              <TabPane tabId="6">
                                <SalwarGrid ref={this.Salwar_Reference}  grid_data={this.state.data} grid_columns={this.state.Salwar_grid_items} non_grid_columns={this.state.Salwar_non_grid_items}/>
                              </TabPane>

                              <TabPane tabId="7">
                                <SafariGrid ref={this.Safari_Reference}  grid_data={this.state.data} grid_columns={this.state.Safari_grid_items} non_grid_columns={this.state.Safari_non_grid_items}/>
                              </TabPane>

                              <TabPane tabId="8">
                                <SuitGrid ref={this.Suit_Reference}  grid_data={this.state.data} grid_columns={this.state.Suit_grid_items} non_grid_columns={this.state.Suit_non_grid_items}/>
                              </TabPane>

                              <TabPane tabId="9">
                                <WaistcoatGrid ref={this.Waistcoat_Referencet}  grid_data={this.state.data} grid_columns={this.state.Waistcoat_grid_items} non_grid_columns={this.state.Waistcoat_non_grid_items}/>
                              </TabPane>

                              <TabPane tabId="10">
                                <JodhpuriGrid ref={this.Jodhpuri_Reference}  grid_data={this.state.data} grid_columns={this.state.Jodhpuri_grid_items} non_grid_columns={this.state.Jodhpuri_non_grid_items}/>
                              </TabPane>
                              </TabContent>
                      </CardBody>
                  </Card>
              </Container>
              </ModalBody>
              <ModalFooter>
                <Button color="link" onClick={this.toggle}>Cancel</Button>
                <Button color="primary" onClick={this.saveBookingDetails}>Save</Button>{' '}
              </ModalFooter>
            </Modal>
          </span>


        </Fragment>
    );
  }
}
