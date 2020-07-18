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

import CustomDatePicker from './CustomDatePicker';
import CustomDateTimePicker from './CustomDateTimePicker';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3001';
const get_items_url = `${API_URL}/worker/getitems`;
const create_worker_url = `${API_URL}/worker/create`;
const search_worker_url = `${API_URL}/worker/search_worker`

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
        id: 'D126',
        name: 'abdul',
        contact: '9032222236',
        status:'1 - Shirt Pending with Manju, \
         2 - Trouser Pending with Raja,\
         4 - Blazer Pending with Su',
        total:'Shirt - 1 , Trousers -  2 , Blazer - 4 ',
        vipFlag:'1'
    },

];


const columns = [
    {
        dataField: 'id',
        text: 'worker ID',
        sort: true,
      //  filter: textFilter()
    },
    {
        dataField: 'name',
        text: 'worker Name',
        sort: true,
      //  filter: textFilter()
    },
    {
        dataField: 'contact',
        text: 'Worker Contact',
        sort: true,
        align: 'center',
      //  filter: textFilter()
    },
    {
        dataField: 'speciality',
        text: 'Workerspeciality',
        sort: true,
        align: 'center',
      //  filter: textFilter()
    }, {
          dataField: 'address',
          text: 'Worker address',
          sort: true,
          align: 'center',
        //  filter: textFilter()
      },  {
            dataField: 'joining_date',
            text: 'Worker joining date',
            sort: true,
            align: 'center',
          //  filter: textFilter()
    },  {
              dataField: 'resign_time',
              text: 'Worker resign time',
              sort: true,
              align: 'center',
            //  filter: textFilter()
          },
          {
               dataField: 'advance',
               text: 'Worker advance',
               sort: true,
               align: 'center',
             //  filter: textFilter()
           },
           {
                dataField: 'old_advance',
                text: 'Worker old advance',
                sort: true,
                align: 'center',
              //  filter: textFilter()
            },
            {
                 dataField: 'recovery_advance ',
                 text: 'Worker recovery advance ',
                 sort: true,
                 align: 'center',
               //  filter: textFilter()
             },


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


export default class WorkerTable extends React.Component {

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
          worker_details : {worker_address:"ANANTAPUR"},
          data: makeData()
        };

        //Worker Joining Date References
        this.JoiningDate_Reference = React.createRef();
        this.Resign_Time_Reference = React.createRef();

        this.toggle = this.toggle.bind(this);

        //worker Details

        this.saveworkerDetails = this.saveworkerDetails.bind(this);
        this.handleworkerNameChange = this.handleworkerNameChange.bind(this);
        this.handleworkerContactChange = this.handleworkerContactChange.bind(this);
        this.handleworkerSpecialityChange = this.handleworkerSpecialityChange .bind(this);
        this.handleworkerAddressChange = this.handleworkerAddressChange.bind(this);
        this.handleworkerStatusChange = this.handleworkerStatusChange.bind(this);
        this.handleworkerJoining_dateChange = this.handleworkerJoining_dateChange.bind(this);
        this.handleworkerResign_timeChange = this.handleworkerResign_timeChange .bind(this);
        this.handleworkerAdvanceChange = this.handleworkerAdvanceChange.bind(this);
        this.handleworkerOld_advanceChange = this.handleworkerOld_advanceChange.bind(this);
        this.handleworkeRecovery_advanceChange = this.handleworkeRecovery_advanceChange.bind(this);

    }

    handleworkerNameChange(event){
      const worker = this.state.worker_details
      worker["worker_name"] = event.target.value
      this.setState({worker_details: worker});
    }


    handleworkerContactChange(event){

      const worker = this.state.worker_details

      const finalURL = search_worker_url + "/" + event.target.value

        axios({
        method: 'get',
        url: finalURL,
        })
      .then((response) =>  {

          var worker_details = response.data.worker_details

          if (worker_details["worker_id"] === undefined){
            worker["worker_id"] = ""
          }else{
            worker["worker_id"] = worker_details["worker_id"]
          }

          this.setState({worker_details: worker});

          if (worker_details["worker_name"] === undefined){
            worker["worker_name"] = ""
          }else{
            worker["worker_name"] = worker_details["worker_name"]
          }

          this.setState({worker_details: worker});
          if (worker_details["worker_contact"] === undefined){
            worker["worker_contact"] = ""
          }else{
            worker["worker_contact"] = worker_details["worker_contact"]
          }

          this.setState({worker_details: worker});

          if (worker_details["worker_address"] === undefined){
            worker["worker_address"] = "ANANTAPUR"
          }else{
            worker["worker_address"] = worker_details["worker_address"]
          }

          this.setState({worker_details: worker});
          if (worker_details["worker_status"] === undefined){
            worker["worker_status"] = "Joined"
          }else{
            worker["worker_status"] = worker_details["worker_status"]
          }
          this.setState({worker_details: worker});

          if (worker_details["worker_joining_date"] === undefined){
            worker["worker_joining_date"] = ""
          }else{
            worker["worker_joining_date"] = worker_details["worker_joining_date"]
          }

          this.setState({worker_details: worker});

          if (worker_details["worker_resign_time"] === undefined){
            worker["worker_resign_time"] = ""
          }else{
            worker["worker_resign_time"] = worker_details["worker_resign_time"]
          }

          this.setState({worker_details: worker});

          if (worker_details["worker_advance"] === undefined){
            worker["worker_advance"] = ""
          }else{
            worker["worker_advance"] = worker_details["worker_advance"]
          }

          this.setState({worker_details: worker});

          if (worker_details["worker_old_advance"] === undefined){
            worker["worker_old_advance"] = ""
          }else{
            worker["worker_old_advance"] = worker_details["worker_old_advance"]
          }

          this.setState({worker_details: worker});

          if (worker_details["worker_recovery_advance"] === undefined){
            worker["worker_recovery_advance"] = ""
          }else{
            worker["worker_recovery_advance"] = worker_details["worker_recovery_advance"]
          }

          this.setState({worker_details: worker});
      })
      .catch(function (error) {
        console.log(error);
      })

      worker["worker_contact"] = event.target.value
      this.setState({worker_details: worker});

    }

    handleworkerSpecialityChange(event){
      const worker = this.state.worker_details
      worker["worker_speciality"] = event.target.value
      this.setState({worker_details: worker});
    }
    handleworkerAddressChange(event){
      const worker = this.state.worker_details
      worker["worker_address"] = event.target.value
      this.setState({worker_details: worker});
    }

    handleworkerStatusChange(event){
       const worker = this.state.worker_details
       worker["worker_status"] = event.target.value
       this.setState({worker_details: worker});
    }
    handleworkerJoining_dateChange(event){
      const worker = this.state.worker_details
      worker["worker_joining_date"] = event.target.value
      this.setState({worker_details: worker});
    }
    handleworkerResign_timeChange(event){
      const worker = this.state.worker_details
      worker["worker_resign_time"] = event.target.value
      this.setState({worker_details: worker});
    }
    handleworkerAdvanceChange(event){
      const worker = this.state.worker_details
      worker["worker_advance"] = event.target.value
      this.setState({worker_details: worker});
    }
    handleworkerOld_advanceChange(event){
      const worker = this.state.worker_details
      worker["worker_old_advance"] = event.target.value
      this.setState({worker_details: worker});
    }
    handleworkeRecovery_advanceChange(event){
      const worker = this.state.worker_details
      worker["worker_recovery_advance"] = event.target.value
      this.setState({worker_details: worker});
    }


    componentDidMount=()=> {

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

    saveworkerDetails(){

      this.fetch_worker_details()



      var input_data = {worker_details:this.state.worker_details,worker_details:this.state.worker_details,worker_item_details:this.state.worker_item_details,worker_measurements:this.state.worker_measurements.measurements}

      axios({
      method: 'post',
      url: create_worker_url,
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
          worker_details: {worker_address:"ANANTAPUR",local_nonlocal_flag:false,vip_nonvip_flag:false},
          worker_details:{worker_type:"Casual",priority_flag:false,worker_status:"Created"},
          worker_item_details:[],
          worker_measurements:{measurements:[]}
        })
    }

    toggleTab(tab) {
      if (this.state.activeTab !== tab) {
          this.setState({
              activeTab: tab
          });
      }
    }

    handleworkerTypeChange(e){
        const worker_details = this.state.worker_details;
        worker_details.worker_type = e.target.value;
        this.setState({worker_details:worker_details});
    }

    handleworkerPriorityFlagChange(e){
      const worker_details = this.state.worker_details;
      worker_details.priority_flag = e.target.checked;
      this.setState({worker_details:worker_details});
    }



    handleworkerDeliveredToChange(e){
      const worker_details = this.state.worker_details;
      worker_details.worker_delivered_to = e.target.value;
      this.setState({worker_details:worker_details});
    }

    handleworkerStatusChange(e){
      const worker_details = this.state.worker_details;
      worker_details.worker_status = e.target.value;
      this.setState({worker_details:worker_details});
    }

    handleworkerQuantityChange(e){
      const worker_details = this.state.worker_details;
      worker_details.worker_quantity = e.target.value;
      this.setState({worker_details:worker_details});
    }

    handleworkerActionChange(e){
      const worker_details = this.state.worker_details;
      worker_details.worker_action = e.target.value;
      this.setState({worker_details:worker_details});
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

                            <Label  style={ { fontWeight: 'bold' ,fontSize: 19} }> Search worker &nbsp;</Label>
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
              <ModalHeader toggle={this.toggle}>Worker Details</ModalHeader>
              <ModalBody>
              <Container fluid>
                  <Card className="main-card mb-3">
                      <CardBody>
                          <Form>
                              <FormGroup row>
                                  <Label for="worker_id" sm={1.5}>Worker ID</Label>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Col sm={2.5}>
                                      <Input type="text" name="worker_id" id="worker_id"
                                             placeholder="" value={this.state.worker_details.worker_id} disabled/>
                                  </Col>
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                      <Label for="worker_name" sm={1.5}>Worker Name</Label>
                                      &nbsp;&nbsp;
                                      <Col sm={2.5}>
                                          <Input type="text" name="worker_name" value ={this.state.worker_details.worker_name} onChange={this.handleworkerNameChange} id="worker_name"
                                                   placeholder=""/>
                                      </Col>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                       <Label for="worker_contact" sm={0.5}>Contact#</Label>
                                         &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;
                                       <Col sm={2.5}>
                                           <Input type="text" name="worker_contact" value ={this.state.worker_details.worker_contact} onChange={this.handleworkerContactChange} id="worker_contact"
                                                  placeholder=""/>
                                       </Col>

                               <Label for="worker_speciality" sm={0.5}>Speciality</Label>
                               &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               &nbsp;&nbsp;
                               <Col sm={1.5}>
                                          <Label select>
                                            <Input type="select" name="select" value={this.state.worker_details.worker_speciality}  onChange={this.handleworkerStatusChange}  id="worker_status" style={{"width":"100%","height":"35px"}}>
                                                <option value="Shirt">Shirt</option>
                                                <option value="Pant">Pant</option>
                                                <option value="Shirt/Pant">Shirt/Pant</option>
                                                <option value="Suit Maker">Suit Maker</option>
                                                <option value="Jodhpuri Maker">Jodhpuri Maker</option>
                                            </Input>

                                            </Label>

                               </Col>
                              </FormGroup>

                              <FormGroup row>


                              <Label for="worker_address" sm={1.5}>Address</Label>
                              &nbsp;&nbsp;  &nbsp;&nbsp;
                              <Col sm={2.5}>
                                  <Input type="text" name="worker_address"
                                         placeholder="" value ={this.state.worker_details.worker_address} onChange={this.handleworkerDeliveredToChange} />
                              </Col>


                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;



                              <Label for="worker_status" sm={0.5}>Status</Label>
                              &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;
                              <Col sm={1.5}>
                                         <Label select>
                                           <Input type="select" name="select" value={this.state.worker_details.worker_status}  onChange={this.handleworkerStatusChange}  id="worker_status" style={{"width":"100%","height":"35px"}}>
                                               <option value="Currently Working">Currently Working</option>
                                               <option value="Resigned">Resigned</option>
                                               <option value="Temporarly Left">Temporarly Left</option>

                                           </Input>

                                           </Label>

                              </Col>


                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Label for="joining_date" sm={1.5}>Joining Date</Label>
                              &nbsp;
                              <Col sm={2}>
                                  <CustomDatePicker ref={this.JoiningDate_Reference}/>
                              </Col>

                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Label for="resign_date" sm={1.5}>Resign Time</Label>
                              &nbsp;
                              <Col sm={2}>
                                  <CustomDateTimePicker ref={this.Resign_Time_Reference}/>
                              </Col>

                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              </FormGroup>

                            <FormGroup row>
                           <Label for="worker_advance" sm={1.5}>Advance</Label>
                           &nbsp;&nbsp;
                           <Col sm={2.5}>
                               <Input type="text" name="worker_advance" value ={this.state.worker_details.worker_advance} onChange={this.handleworkerNameChange} id="worker_name"
                                        placeholder=""/>
                           </Col>

                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                              <Label for="worker_oldadvance" sm={1.5}>OldAdvance</Label>
                              &nbsp;&nbsp;
                              <Col sm={2.5}>
                                  <Input type="text" name="worker_old_advance" value ={this.state.worker_details.worker_oldadvance} onChange={this.handleworkerNameChange} id="worker_name"
                                           placeholder=""/>
                              </Col>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                               <Label for="worker_recoveryadvance" sm={1.5}>RecoveryAdvance</Label>
                               &nbsp;&nbsp;
                               <Col sm={2.5}>
                                   <Input type="text" name="worker_recoveryadvance" value ={this.state.worker_details.worker_recoveryadvance} onChange={this.handleworkerNameChange} id="worker_name"
                                            placeholder=""/>
                               </Col>

                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                              </FormGroup>


                              <br/><br/>
                          </Form>
                          <br/>

                      </CardBody>
                  </Card>
              </Container>
              </ModalBody>
              <ModalFooter>
                <Button color="link" onClick={this.toggle}>Cancel</Button>
                <Button color="primary" onClick={this.saveworkerDetails}>Save</Button>{' '}
              </ModalFooter>
            </Modal>
          </span>


        </Fragment>
    );
  }
}
