import React from 'react';
import ReactTable from "react-table";
import {
    Row, Col,
    Card, CardBody,CardTitle,Form,FormGroup,Label,Container,Input, FormFeedback, FormText,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,  TabContent, TabPane,
} from 'reactstrap';

 
class ShirtGrid extends React.Component {
  
  constructor(props) {
    super(props);
    this.measurment_category = "Shirt"
    this.column_data = []
    this.non_column_data = []
    this.renderEditable = this.renderEditable.bind(this);
    this.item_details = {item_type:this.measurment_category,item_qty:"",item_status:"Created",total_cost:0}
    if(this.props.item_details!=null && this.props.item_details.item_qty > 0){
      this.item_details = this.props.item_details
    }
    this.props.grid_columns.map((measurement_data, index) =>
      this.column_data.push({Header:measurement_data.Header,Cell:this.renderEditable, accessor: measurement_data.Header,measurment_category:this.measurment_category,measurment_code:measurement_data.measurment_code})
    );
    
    this.props.non_grid_columns.map((measurement_data, index) =>
      this.non_column_data.push({Header:measurement_data.Header,Cell:this.renderEditable, accessor: measurement_data.Header,measurment_category:this.measurment_category,measurment_code:measurement_data.measurment_code})
    );
    
    this.reactTable = React.createRef();

    this.fetch_measurement_details = this.fetch_measurement_details.bind(this);
    this.handleBRSBRadioButtonChange = this.handleBRSBRadioButtonChange.bind(this);
    this.handleKBGBRadioButtonChange = this.handleKBGBRadioButtonChange.bind(this);
    this.handlePattiTypeRadioButtonChange = this.handlePattiTypeRadioButtonChange.bind(this);
    this.handleInPocketCheckBoxChange = this.handleInPocketCheckBoxChange.bind(this);
    this.handleShoulderTypeChange = this.handleShoulderTypeChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
  
    this.state = {
      non_grid_measurement_type:{s_SB_BR:"s_SB_BR",s_KB_GB:"s_KB_GB",s_PattiType:"s_PattiType",s_InPocket:"s_InPocket",s_ShoulderType:"s_ShoulderType",s_Comments:"s_Comments"},
      non_grid_data:{SB:"SB",BR:"BR",KB:"KB",GB:"GB", APatti:"A Patti",ZPatti:"Z Patti",InPocket:"1",s_SB_BR_Value:"",s_KB_GB_Value:"",s_PattiType_Value:"",s_InPocket_Value:"",s_ShoulderType_Value:"Down Shoulder",s_Comments_Value:""},
      data:this.props.grid_data,
      Shirt_grid_items:this.column_data,
      Shirt_non_grid_items:this.non_column_data,
      reactTable : this.reactTable,
      react_table_data:[],
      measurement_data :[],
      item_details : this.item_details
    };
  }
  
  fetch_measurement_details(){
    const react_table_data = this.reactTable.current.getResolvedState().sortedData[0]._original;
    const measurement_data = this.state.measurement_data
    var measurement_col_info = {}
    var measurement = {}
    
    this.props.grid_columns.map((measurement_data, index) =>
      measurement_col_info[ measurement_data.Header] = measurement_data.measurment_code,
    );
    
    Object.keys(react_table_data).map((key, index) => ( 
      
          measurement = {},
          measurement["measurment_category"] = this.measurment_category,
          measurement["measurment_code"] = measurement_col_info[key],
          measurement["measurment_value"] = react_table_data[key],
          measurement_data.push(measurement)
      ))
    
    const non_grid_data = this.state.non_grid_data  
    
    var br_sb_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.s_SB_BR,measurment_value:non_grid_data["s_SB_BR_Value"]}  
    measurement_data.push(br_sb_measurement)   
    
    var kb_gb_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.s_KB_GB,measurment_value:non_grid_data["s_KB_GB_Value"]}
    measurement_data.push(kb_gb_measurement)   
      
    var patti_type_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.s_PattiType,measurment_value:non_grid_data["s_PattiType_Value"]}
    measurement_data.push(patti_type_measurement)   
  
    var in_pocket_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.s_InPocket,measurment_value:non_grid_data["s_InPocket_Value"]}
    measurement_data.push(in_pocket_measurement)   
    
    var shoulder_type_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.s_ShoulderType,measurment_value:non_grid_data["s_ShoulderType_Value"]}
    measurement_data.push(shoulder_type_measurement)   
    
    var comments_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.s_Comments,measurment_value:non_grid_data["s_Comments_Value"]}
    measurement_data.push(comments_measurement)   
    
    this.setState({measurement_data: measurement_data});
    
  }
  renderEditable(cellInfo) {
      return (
        <div>
          <input 
              style={{backgroundColor: "#fafafa",textAlign: "center" }}
              contentEditable
              suppressContentEditableWarning
              onBlur={e => {  
                  const data = [...this.state.data];
                  data[cellInfo.index][cellInfo.column.id] = e.target.value;
                  this.setState({data});
                
              }}
              
          />
          </div>
      );
  }
  
  handleBRSBRadioButtonChange(event){
    const non_grid_data = this.state.non_grid_data  
    non_grid_data["s_SB_BR_Value"] = event.target.value   
    this.setState({non_grid_data:non_grid_data});           
  }
  
  handleKBGBRadioButtonChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["s_KB_GB_Value"] = event.target.value 
    this.setState({non_grid_data:non_grid_data});
     
  }
  
  handlePattiTypeRadioButtonChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["s_PattiType_Value"] = event.target.value 
    this.setState({non_grid_data:non_grid_data});               
  }
  
  handleInPocketCheckBoxChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["s_InPocket_Value"] = event.target.checked 
    this.setState({non_grid_data:non_grid_data});                    
  }
  
  handleShoulderTypeChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["s_ShoulderType_Value"] = event.target.value 
    this.setState({non_grid_data:non_grid_data});              
  }
  
  handleStatusChange(event){
    const item_details_map = this.state.item_details  
    item_details_map["item_status"] = event.target.value   
    this.setState({item_details:item_details_map});           
  }
  
  handleQuantityChange(event){
    const item_details_map = this.state.item_details  
    item_details_map["item_qty"] = event.target.value   
    this.setState({item_details:item_details_map});           
  }
  
  
  handleCommentsChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["s_Comments_Value"] = event.target.value 
    this.setState({non_grid_data:non_grid_data});
  }
  
  
  render() {
    return (
      <div>
      <Form>
      <br/><br/>
      <FormGroup row>
      <Label for="Shirt_quantity" sm={2}>Shirt Quantity</Label>
      <Col sm={2.5}>
          <Input type="text" value ={this.state.item_details.item_qty} onChange={this.handleQuantityChange} name="Shirt_quantity" id="Shirt_quantity"
                 placeholder=""/>
      </Col>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Label for="booking_status" sm={0.5}>Shirt Status</Label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
      <Col sm={1.5}>
                 <Label select>
                   <Input type="select" name="select" value={this.state.item_details.item_status}  onChange={this.handleStatusChange}  id="status" style={{"width":"100%","height":"35px"}}>
                       <option value="Created">Created</option>
                       <option value="With Worker">With Worker</option>
                       <option value="In StockRoom">In StockRoom</option>
                       <option value="Delivered">Delivered</option>
                   </Input>

                   </Label>
      
      </Col>

      </FormGroup>
      <br/><br/>
        <ReactTable
             showPaginationBottom={false}
              minRows={1}      
              data={this.state.data}
              ref={this.state.reactTable}
              columns={this.state.Shirt_grid_items}
              className="-striped -highlight">
          </ReactTable> 
          <br/>
          <FormGroup tag="fieldset">
              <FormGroup check>
                   &nbsp;&nbsp;
                  <Label check>
                      <Input type="radio" value={this.state.non_grid_data.BR} name="booking_Shirt_SB_group" checked={this.state.non_grid_data.s_SB_BR_Value==this.state.non_grid_data.BR} onChange={this.handleBRSBRadioButtonChange}/>{' '}
                       BR
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Label>
                  <Label check>
                      <Input type="radio" value={this.state.non_grid_data.SB} name="booking_Shirt_SB_group" checked={this.state.non_grid_data.s_SB_BR_Value==this.state.non_grid_data.SB} onChange={this.handleBRSBRadioButtonChange}/>{' '}
                      SB
                  </Label>

                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Label check>
                      <Input type="radio" value={this.state.non_grid_data.APatti} checked={this.state.non_grid_data.s_PattiType_Value==this.state.non_grid_data.APatti} onChange={this.handlePattiTypeRadioButtonChange} name="booking_Shirt_Patti_group"/>{' '}
                       A Patti
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Label>
                  <Label check>
                      <Input type="radio" value={this.state.non_grid_data.ZPatti} checked={this.state.non_grid_data.s_PattiType_Value==this.state.non_grid_data.ZPatti} onChange={this.handlePattiTypeRadioButtonChange} name="booking_Shirt_Patti_group"/>{' '}
                      Z Patti
                  </Label>

                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Label check>
                        <Input type="radio" value={this.state.non_grid_data.KB} name="booking_Shirt_KB_group" checked={this.state.non_grid_data.s_KB_GB_Value==this.state.non_grid_data.KB} onChange={this.handleKBGBRadioButtonChange} name="booking_Shirt_KB_group"/>{' '}
                         KB
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Label>
                    <Label check>
                        <Input type="radio" value={this.state.non_grid_data.GB} name="booking_Shirt_KB_group" checked={this.state.non_grid_data.s_KB_GB_Value==this.state.non_grid_data.GB} onChange={this.handleKBGBRadioButtonChange} name="booking_Shirt_KB_group"/>{' '}
                        GB
                    </Label>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                  <Label check>
                      <Input type="checkbox" value ={this.state.non_grid_data.s_InPocket_Value} checked={this.state.non_grid_data.s_InPocket_Value} onChange={this.handleInPocketCheckBoxChange} id="booking_shirt_In_Pocket"/>{' '}
                      In Pocket

                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;

                    </Label>
                    <Label select>
                      <Input type="select" name="select" value={this.state.non_grid_data.s_ShoulderType_Value}  onChange={this.handleShoulderTypeChange}  id="booking_Shoulder_Type" style={{"width":"100%","height":"10%"}}>
                          <option value="Down Shoulder">Down Shoulder</option>
                          <option value="Round Shoulder">Round Shoulder</option>
                          <option value="Broad Shoulder">Broad Shoulder</option>
                          <option value="High Shoulder">High Shoulder</option>
                      </Input>
                  </Label>

              </FormGroup>
          <br/>  <br/>
          <FormGroup>
          <Label textarea>   Comments </Label>

            <Input type="textarea" name="select" value ={this.state.non_grid_data.s_Comments_Value} onChange={this.handleCommentsChange}  id="booking_Shirt_Comments" style={{"width":"30%","height":"5%"}}/>

          </FormGroup>
          </FormGroup>
          
        </Form>
        
      </div>
    );
  }
}

export default ShirtGrid;
