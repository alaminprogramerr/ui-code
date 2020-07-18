import React, {Component, Fragment} from 'react';
import {
    Row, Col,
    Button,
    CardHeader,
    Container,
    Card,
    CardBody,
    Progress,
    ListGroup,
    ListGroupItem, CardFooter,
    CustomInput, Input,
    Dropdown, DropdownItem, DropdownToggle, DropdownMenu,
    UncontrolledButtonDropdown,
    CardTitle,Form,FormGroup,Label, FormFeedback, FormText,
    TabContent, TabPane
} from 'reactstrap';

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';

import CountUp from 'react-countup';

import ReactTable from "react-table";

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';

import Ionicon from 'react-ionicons/lib';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Slider from "react-slick";

import {makeData} from "../../../Tables/DataTables/Examples/utils";

import CustomDatePicker from '../CustomDatePicker';
import CustomDateTimePicker from '../CustomDateTimePicker';


import {
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';

import {
    faAngleUp,
    faAngleDown,
    faCalendarAlt,
    faEllipsisH,
    faCheck,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Select from 'react-select';

const options = [
    {value: '1', label: 'Today'},
    {value: '2', label: 'Last Week'},
    {value: '3', label: 'Last 30 Days'},
    {value: '4', label: 'Last 3 Months'},
    {value: '5', label: 'Last Year'},
    
];

const iconData = [
    "lnr-plus-circle","lnr-circle-minus"
];
export default class ShirtDashboard extends Component {
    constructor() {
        super();

        this.state = {
            data: makeData(),
            worker_details: {},
            rows: []
        };
        this.toggle = this.toggle.bind(this);

    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
    };

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleAddRow = () => {
      this.setState((prevState, props) => {
        const row = { content: "Text" };
        return { rows: [...prevState.rows, row] };
      });
    };

    handleRemoveRow = () => {
      this.setState((prevState, props) => {
        return { rows: prevState.rows.slice(1) };
      });
    };
    render() {

        return (   
          <Fragment> 
          <Card className="main-card mb-3">
              <CardBody >
                  <Form>
                      <FormGroup row>
                        <Label for="worker_id" sm={1.5}>Total Quantity</Label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Col sm={2.5}>
                              <Input type="text" name="worker_id" id="worker_id"
                                     placeholder="" value={this.state.worker_details.worker_id} disabled/>
                          </Col>
                        
                        <Label for="worker_id" sm={1.5}>Assigned Quantity</Label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Col sm={2.5}>
                              <Input type="text" name="worker_id" id="worker_id"
                                     placeholder="" value={this.state.worker_details.worker_id} disabled/>
                          </Col>
                                  
                        <Label for="worker_id" sm={1.5}>Remaining Quantity</Label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Col sm={2.5}>
                              <Input type="text" name="worker_id" id="worker_id"
                                     placeholder="" value={this.state.worker_details.worker_id} disabled/>
                          </Col>
                          &nbsp;&nbsp;
                      
                           &nbsp;&nbsp;&nbsp;&nbsp;
                          <Col md="0.5" key={iconData[0]}>
                              <div className="font-icon-wrapper">
                                  <i className={iconData[0]} onClick={this.handleAddRow}> </i>
                              </div>
                          </Col>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Col md="0.5" key={iconData[1]}>
                              <div className="font-icon-wrapper">
                                  <i className={iconData[1]} onClick={this.handleRemoveRow}> </i>
                              </div>
                          </Col>                                   
                      </FormGroup>
                      <br/>  <br/>
                      {this.state.rows.map(row => (
                          <FormGroup row>
                          
                          <Label for="worker_id" sm={1.5}>Enter Quantity</Label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Col sm={2.5}>
                                <Input type="text" name="worker_id" id="worker_id"
                                       placeholder="" value={this.state.worker_details.worker_id} disabled/>
                            </Col>
                              &nbsp;&nbsp; &nbsp;&nbsp; 
                            <Label for="worker_speciality" sm={0.5}>Select Worker</Label>
                            &nbsp;&nbsp; &nbsp;&nbsp;   &nbsp;&nbsp;   &nbsp;&nbsp; 
                            
                            <span className="d-inline-block ml-2" style={{width: 200}}>
                                <Select
                                    value={this.state.worker_details.worker_id}
                                    onChange={this.handleChange}
                                    options={options}
                                />
                            </span>
                            &nbsp;&nbsp; &nbsp;&nbsp; 
                          <Label for="worker_speciality" sm={0.5}>Item Status</Label>
                            <span className="d-inline-block ml-2" style={{width: 200}}>
                                <Select
                                    value={this.state.worker_details.worker_id}
                                    onChange={this.handleChange}
                                    options={options}
                                />
                            </span>
                         </FormGroup>
                       
                        ))}
                       
                </Form>
              </CardBody>
          </Card>
          </Fragment>             
        )
    }
}
