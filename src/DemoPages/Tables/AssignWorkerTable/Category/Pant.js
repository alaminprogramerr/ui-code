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

export default class ShirtDashboard extends Component {
    constructor() {
        super();

        this.state = {
            data: makeData(),
            worker_details: {}
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

    render() {

        return (   
          <Fragment> 
          <Container>
              <Card className="main-card">
              <CardHeader className="card-header-tab z-index-6">
                  <div
                      className="card-header-title font-size-lg text-capitalize font-weight-normal">
                      <i className="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                      Portfolio Performance PANT PANT
                  </div>
                  <div className="btn-actions-pane-right text-capitalize">
                          <span className="d-inline-block ml-2" style={{width: 200}}>
                              
                          </span>
                  </div>
              </CardHeader>
                </Card>
            </Container>      
          </Fragment>             
        )
    }
}
