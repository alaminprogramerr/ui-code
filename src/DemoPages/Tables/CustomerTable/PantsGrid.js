import React from 'react';
import ReactTable from "react-table";
import {
    Row, Col,
    Card, CardBody,CardTitle,Form,FormGroup,Label,Container,Input, FormFeedback, FormText,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,  TabContent, TabPane,
} from 'reactstrap';

class PantsGrid extends React.Component {
  
  constructor(props) {
    super(props);
    this.measurment_category = "Pant"
    this.column_data = []
    this.renderEditable = this.renderEditable.bind(this);
    this.props.grid_columns.map((measurement_data, index) =>
      this.column_data.push({Header:measurement_data.Header,Cell:this.renderEditable, accessor: measurement_data.Header,measurment_category:this.measurment_category,measurment_code:measurement_data.measurment_code})
    );
    
    this.reactTable = React.createRef();

    this.fetch_measurement_details = this.fetch_measurement_details.bind(this);
    
    this.handlePLPleatlessRadioButtonChange = this.handlePocketTypeChange.bind(this);
    this.handleGripCheckBoxChange = this.handleGripCheckBoxChange.bind(this);
    this.handleHPCheckBoxChange = this.handleHPCheckBoxChange.bind(this);
    this.handle2INCHCheckBoxChange = this.handle2INCHCheckBoxChange.bind(this);
    this.handlePocketTypeChange = this.handlePocketTypeChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
    
    this.state = {
      non_grid_measurement_type:{p_PL_Pleatless:"p_PL_Pleatless",p_PocketType:"p_PocketType",p_Grip:"p_Grip",p_HP:"p_HP",p_2InchRingLength:"p_2InchRingLength",p_Comments:"p_Comments"},
      non_grid_data:{PL:"PL",Pleatless:"Pleatless",p_Grip_Value:false,p_HP_Value:false,p_2InchRingLength_Value:false,p_PL_Pleatlesss_Value:"",p_PocketType_Value:"Cross Pocket",p_Comments_Value:""},
      data:this.props.grid_data ,
      Pants_grid_items:this.column_data,
      reactTable : this.reactTable,
      react_table_data:[],
      measurement_data :[],
      item_details : {item_type:this.measurment_category,item_qty:"",item_status:"Created",total_cost:0}
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
      
      var p_PL_Pleatless_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.p_PL_Pleatless,measurment_value:non_grid_data["p_PL_Pleatlesss_Value"]}  
      measurement_data.push(p_PL_Pleatless_measurement)   
      
      var p_PocketType_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.p_PocketType,measurment_value:non_grid_data["p_PocketType_Value"]}
      measurement_data.push(p_PocketType_measurement)   
        
        
      var p_Grip_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.p_Grip,measurment_value:non_grid_data["p_Grip_Value"]}
      measurement_data.push(p_Grip_measurement)   
    
      var p_HP_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.p_HP,measurment_value:non_grid_data["p_HP_Value"]}
      measurement_data.push(p_HP_measurement)   
      
      var p_2InchRingLength_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.p_2InchRingLength,measurment_value:non_grid_data["p_2InchRingLength_Value"]}
      measurement_data.push(p_2InchRingLength_measurement)   
      
      var comments_measurement = {measurment_category:this.measurment_category,measurment_code:this.state.non_grid_measurement_type.s_Comments,measurment_value:non_grid_data["s_Comments_Value"]}
      measurement_data.push(comments_measurement)   
      
      this.setState({measurement_data: measurement_data});
  
    this.setState({
        measurement_data: measurement_data
    });
    
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
  
  handleQuantityChange(event){
    const item_details = this.state.item_details  
    item_details["item_qty"] = event.target.value   
    this.setState({item_details:item_details});           
  }
  
  
  handleStatusChange(event){
    const item_details = this.state.item_details  
    item_details["item_status"] = event.target.value   
    this.setState({item_details:item_details});           
  }
  
  handleCommentsChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["p_Comments_Value"] = event.target.value 
    this.setState({non_grid_data:non_grid_data});
  }
  
  handlePLPleatlessRadioButtonChange(event){
    const non_grid_data = this.state.non_grid_data  
    non_grid_data["p_PL_Pleatlesss_Value"] = event.target.value   
    this.setState({non_grid_data:non_grid_data});           
  }
  
  handleGripCheckBoxChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["p_Grip_Value"] = event.target.checked 
    this.setState({non_grid_data:non_grid_data});                    
  }
  
  handleHPCheckBoxChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["p_HP_Value"] = event.target.checked 
    this.setState({non_grid_data:non_grid_data});                    
  }
  
  handle2INCHCheckBoxChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["p_2InchRingLength_Value"] = event.target.checked 
    this.setState({non_grid_data:non_grid_data});                    
  }
  
  handlePocketTypeChange(event){
    const non_grid_data = this.state.non_grid_data
    non_grid_data["p_PocketType_Value"] = event.target.value 
    this.setState({non_grid_data:non_grid_data});              
  }
  

  render() {
    return (
      <div>
      <Form>
      <br/><br/>
      <FormGroup row>
      <Label for="Pants_quantity" sm={2}>Pants Quantity</Label>
      <Col sm={2.5}>
          <Input type="text" value ={this.state.item_details.item_qty} onChange={this.handleQuantityChange} name="Pants_quantity" id="Pants_quantity"
                 placeholder=""/>
      </Col>
      
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Label for="Pants" sm={0.5}>Pants Status</Label>
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
          columns={this.state.Pants_grid_items}
          className="-striped -highlight"
      />

      <br/>  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Label check>
          <Input type="radio" value={this.state.non_grid_data.PL} checked={this.state.non_grid_data.p_PL_Pleatlesss_Value==this.state.non_grid_data.PL} onChange={this.handlePLPleatlessRadioButtonChange} name="booking_Pant_PL_group"/>{' '}
           PL
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Label>
      <Label check>
          <Input type="radio" value={this.state.non_grid_data.Pleatless} checked={this.state.non_grid_data.p_PL_Pleatlesss_Value==this.state.non_grid_data.Pleatless} onChange={this.handlePLPleatlessRadioButtonChange} name="booking_Pant_PL_group"/>{' '}
          Pleatless
      </Label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Label select>
        <Input type="select" value={this.state.non_grid_data.p_PocketType_Value}  onChange={this.handlePocketTypeChange}  id="booking_pant_pocket" style={{"width":"100%","height":"10%"}}>
            <option value="Cross Pocket">Cross Pocket</option>
            <option value="Bone Pocket">Bone Pocket</option>
            <option value="L Pocket">L Pocket</option>
            <option value="Jean Pocket">Jean Pocket</option>
        </Input>
          </Label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Label check>
            <Input type="checkbox" value ={this.state.non_grid_data.p_Grip_Value} checked={this.state.non_grid_data.p_Grip_Value} onChange={this.handleGripCheckBoxChange} id="booking_pant_grip"/>{' '}
            Grip

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          </Label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
          <Label check>
              <Input type="checkbox" value ={this.state.non_grid_data.p_HP_Value} checked={this.state.non_grid_data.p_Grip_Value} onChange={this.handleHPCheckBoxChange} id="booking_pant_HP"/>{' '}
              HP

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;

            </Label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;
            <Label check>
                <Input type="checkbox" value ={this.state.non_grid_data.p_2InchRingLength_Value} checked={this.state.non_grid_data.p_Grip_Value} onChange={this.handle2INCHCheckBoxChange} id="booking_pant_ringlength"/>{' '}
                2Inch Ring Length

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;

              </Label>

      <br/>  <br/>
      <FormGroup>
      <Label textarea>   Comments </Label>

        <Input type="textarea" name="select" value ={this.state.non_grid_data.p_Comments_Value} onChange={this.handleCommentsChange} id="booking_Pant_Comments" style={{"width":"30%","height":"5%"}}/>

      </FormGroup>
      </Form>
     </div>
    );
  }
}

export default PantsGrid;
