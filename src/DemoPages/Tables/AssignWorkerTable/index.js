import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
import ShirtDashboard from './Category/Shirt';
import PantDashboard from './Category/Pant';
import AnalyticsDashboard1 from './Category/Variation1';
import AnalyticsDashboard2 from './Category/Variation2';
import PopoversExample from "../../Components/TooltipsPopovers";


import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
    Row, Col,
    Card, CardBody,CardTitle,Form,FormGroup,Label,Container,Input, FormFeedback, FormText,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import filterFactory, {textFilter,selectFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Center from 'react-center';
import BootstrapTable from 'react-bootstrap-table-next';
import {makeData} from "./utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const { SearchBar } = Search;

const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
}];


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
        text: 'Booking ID',
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
        dataField: 'status',
        isDummyField: false,
        align: 'center',
        text: 'Status',
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

export default class AnalyticsDashboard extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        activeTab: '1',
        modal:false,
        selectedRow:[],
        rowNumber:12,
        item_tabs:[],
        nestedModal: false,
        worker_details : {worker_address:"ANANTAPUR"},
        data: makeData()
  };
  this.toggle = this.toggle.bind(this);

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
                  <CardBody>
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
              <ModalHeader toggle={this.toggle}>Assign Worker for Booking#123456678</ModalHeader>
              <ModalBody>
              
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    
                    <Tabs
                        defaultActiveKey="1"
                        renderTabBar={() => <ScrollableInkTabBar/>}
                        renderTabContent={() => <TabContent/>}
                    >
                        <TabPane tab='Shirt' key="1"><ShirtDashboard/></TabPane>
                        <TabPane tab='Pant' key="2"><PantDashboard/></TabPane>
                        <TabPane tab='Jubba' key="3"><ShirtDashboard/></TabPane>
                        <TabPane tab='Chuddidar' key="4"><ShirtDashboard/></TabPane>
                        <TabPane tab='Salwar' key="5"><ShirtDashboard/></TabPane>
                        <TabPane tab='Safari' key="6"><ShirtDashboard/></TabPane>
                        <TabPane tab='Suit' key="7"><ShirtDashboard/></TabPane>
                        <TabPane tab='Waistcoat' key="8"><ShirtDashboard/></TabPane>
                        <TabPane tab='Jodhpuri' key="9"><ShirtDashboard/></TabPane>

                    </Tabs>
                </ReactCSSTransitionGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Cancel</Button>
                  <Button color="primary" onClick={this.saveBookingDetails}>Save</Button>{' '}
                </ModalFooter>
              </Modal>
            </span>
            </Fragment>
        )
    }
}
