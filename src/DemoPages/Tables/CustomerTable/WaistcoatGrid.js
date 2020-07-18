import React from 'react';
import ReactTable from "react-table";
import {
    Row, Col,
    Card, CardBody,CardTitle,Form,FormGroup,Label,Container,Input, FormFeedback, FormText,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,  TabContent, TabPane,
} from 'reactstrap';


class WaistcoatGrid extends React.Component {

  constructor(props) {
    super(props);
    this.measurment_category = "Waistcoat"
    this.column_data = []
    this.renderEditable = this.renderEditable.bind(this);
    this.props.grid_columns.map((measurement_data, index) =>
      this.column_data.push({Header:measurement_data.Header,Cell:this.renderEditable, accessor: measurement_data.Header,measurment_category:this.measurment_category,measurment_code:measurement_data.measurment_code})
    );
    
    this.reactTable = React.createRef();

    this.fetch_measurement_details = this.fetch_measurement_details.bind(this);
    
    this.state = {
      data:[{}] ,
      Waistcoat_grid_items:this.column_data,
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
      <Label for="Waistcoat_quantity" sm={2}>Waistcoat Quantity</Label>
      <Col sm={2.5}>
          <Input type="text" name="Waistcoat_quantity" id="Waistcoat_quantity"
                 placeholder=""/>
      </Col>
      </FormGroup>
      <br/>

      <ReactTable
         showPaginationBottom={false}
          minRows={1}
          data={this.state.data}
          columns={this.state.Waistcoat_grid_items}
          className="-striped -highlight"
      />
      <Label check>
        <Input type="radio" name="booking_WaistCoat_cut"/>{' '}
          Side Cut
      </Label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
      <Label check>
          <Input type="radio" name="booking_WaistCoat_cut"/>{' '}
            Center Cut
      </Label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
      <br/>  
      <FormGroup>
            <Label textarea>   Comments </Label>
            <Input type="textarea" name="select" id="booking_WaistCoat_Comments" style={{"width":"30%","height":"5%"}}/>
           </FormGroup>
        //REPLACE TO HERE
        </Form>
      </div>
    );
  }
}

export default WaistcoatGrid;
