import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import { Button } from 'reactstrap';
import TitleComponent1 from './PageTitleExamples/Variation1'
import TitleComponent2 from './PageTitleExamples/Variation2'
import TitleComponent3 from './PageTitleExamples/Variation3'

class PageHeader extends Component {

  constructor(props) {
      super(props);
      this.props = props
      this.sampleMethod = this.sampleMethod.bind(this)
    }
    randomize(myArray) {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }

    sampleMethod(){
        this.props.parentMethod();
    }
    render() {
        let {
            enablePageTitleIcon,
            enablePageTitleSubheading,
            heading,
            icon,
            subheading,
            buttonName
        } = this.props;

        var arr = [<TitleComponent1 />, <TitleComponent2 />, <TitleComponent3 />]

        return (

            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div
                            className={cx("page-title-icon", {'d-none': !enablePageTitleIcon})}>
                            <i className={icon}/>
                        </div>
                        <div>
                            {heading}

                        </div>
                    </div>

                </div>

                <div style={{align:'center'}}>
                      <Button color="primary" style={{align:'center', width:'200px',height:'50px'}} onClick={this.sampleMethod}>{buttonName}</Button>
                </div>
            </div>



        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
