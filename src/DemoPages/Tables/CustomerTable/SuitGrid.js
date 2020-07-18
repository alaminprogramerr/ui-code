import React from 'react';
import ReactTable from "react-table";
import {
    Row, Col,
    Card, CardBody,CardTitle,Form,FormGroup,Label,Container,Input, FormFeedback, FormText,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,  TabContent, TabPane,
} from 'reactstrap';


class SuitGrid extends React.Component {

  constructor(props) {
    super(props);
    this.measurment_category = "Suite"
    this.column_data = []
    this.renderEditable = this.renderEditable.bind(this);
    this.props.grid_columns.map((measurement_data, index) =>
      this.column_data.push({Header:measurement_data.Header,Cell:this.renderEditable, accessor: measurement_data.Header,measurment_category:this.measurment_category,measurment_code:measurement_data.measurment_code})
    );
    
    this.reactTable = React.createRef();

    this.fetch_measurement_details = this.fetch_measurement_details.bind(this);
    
    this.state = {
      data:[{}] ,
      Suit_grid_items:this.column_data,
      reactTable : this.reactTable,
      react_table_data:[],
      measurement_data :[],
      item_details : {item_type:this.measurment_category,item_qty:2,item_status:"",total_cost:0}
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
        
    //react_table_data_array = [{}]
  
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
  
  render() {
    return (
      <div>
      <Form>
      <br/><br/>
      <FormGroup row>
      <Label for="Suit_quantity" sm={2}>Suit Quantity</Label>
      <Col sm={2.5}>
          <Input type="text" name="Suit_quantity" id="Suit_quantity"
                 placeholder=""/>
      </Col>
      </FormGroup>
      <br/>
      <ReactTable
         showPaginationBottom={false}
          minRows={1}
          data={this.state.data}
          columns={this.state.Suit_grid_items}
          className="-striped -highlight"
      />
 <br/>
<Label check>
<Input type="radio" name="booking_Suit_Button"/>{' '}
  2 Buttons
      </Label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
<Label check>
<Input type="radio" name="booking_Suit_Button"/>{' '}
        1 Button
            </Label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
      <Label select>
        <Input type="select" name="select" id="booking_suit_colar" style={{"width":"100%","height":"10%"}}>
            <option>DB Colar</option>
            <option>SB Colar</option>
            <option>SHALL Colar</option>
        </Input>
          </Label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;
      <Label select>
        <Input type="select" name="select" id="booking_suit_cut" style={{"width":"100%","height":"10%"}}>
                          <option>Round Cut</option>
                          <option>Square Cut</option>
                          <option>Side Cut</option>
                          <option>center Cut</option>
                      </Input>
                        </Label>
    <br/><br/>
      <FormGroup>
      <Label textarea>   Comments </Label>
         <Input type="textarea" name="select" id="booking_suit_Comments" style={{"width":"30%","height":"5%"}}/>
       </FormGroup>

        </Form>
      </div>
    );
  }
}

export default SuitGrid;
