import React, {Fragment} from 'react'

import {
    InputGroup, InputGroupAddon
} from 'reactstrap';

import {
    faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';

class CustomDateTimePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <Fragment>
                <InputGroup>
                <InputGroupAddon addonType="append">
                    <div className="input-group-text">
                        <FontAwesomeIcon icon={faCalendarAlt}/>
                    </div>
                </InputGroupAddon>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        className="form-control"
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="Time"
                    />
                  
                </InputGroup>
            </Fragment>
        )
    }
}

export default CustomDateTimePicker;
