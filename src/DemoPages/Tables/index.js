import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import DataTableBasic from './DataTables/Examples/Basic';
import DataTableCustomComps from './DataTables/Examples/CustomComps';
import DataTableEditable from './DataTables/Examples/EditableTable';
import DataTableFixedHeader from './DataTables/Examples/FixedHeader';
import DataTablePivoting from './DataTables/Examples/Pivoting';
import RegularTables from './RegularTables';
import GridTables from './GridTables';
import BookingTable from './BookingTable';
import WorkerTable from './WorkerTable';
import CustomerTable from './CustomerTable';
import CuttingTable from './CuttingTable';
import AssignWorkerTable from './AssignWorkerTable'
// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options

import ThemeOptions from '../../Layout/ThemeOptions/';

const Tables = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>

            <div className="app-main__outer">

                <div className="app-main__inner">

                    {/* Tables */}

                    <Route path={`${match.url}/data-tables`} component={DataTableBasic}/>
                    <Route path={`${match.url}/datatables-custom-components`} component={DataTableCustomComps}/>
                    <Route path={`${match.url}/datatables-editable`} component={DataTableEditable}/>
                    <Route path={`${match.url}/datatables-fixed-header`} component={DataTableFixedHeader}/>
                    <Route path={`${match.url}/datatables-aggregation`} component={DataTablePivoting}/>
                    <Route path={`${match.url}/regular-tables`} component={RegularTables}/>
                    <Route path={`${match.url}/grid-tables`} component={GridTables}/>
                    <Route path={`${match.url}/booking-table`} component={BookingTable}/>
                    <Route path={`${match.url}/customer-table`} component={CustomerTable}/>
                    <Route path={`${match.url}/cutting-table`} component={CuttingTable}/>
                    <Route path={`${match.url}/worker-table`} component={WorkerTable}/>
                    <Route path={`${match.url}/assign-worker-table`} component={AssignWorkerTable}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Tables;
