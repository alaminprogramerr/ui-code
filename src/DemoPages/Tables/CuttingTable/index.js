import React, {Component, Fragment} from 'react';
import Tabs from 'react-responsive-tabs';


import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import SalesDashboard1 from './Examples/Variation1';

const tabsContent = [
    {
        title: 'Shirts',
        content: <SalesDashboard1/>
    },
    {
        title: 'Pants',
        content: <SalesDashboard1/>
    },
    {
        title: 'Jubba',
        content: <SalesDashboard1/>
    },
    {
        title: 'Chuddidar',
        content: <SalesDashboard1/>
    },
    {
        title: 'Salwar',
        content: <SalesDashboard1/>
    },{
        title: 'Safari',
        content: <SalesDashboard1/>
    },{
        title: 'Suite',
        content: <SalesDashboard1/>
    },{
        title: 'Waistcoat',
        content: <SalesDashboard1/>
    },{
        title: 'Jodhpuri',
        content: <SalesDashboard1/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export default class CuttingTable extends Component {

    render() {
        return (

            <Fragment>
                <div className="app-inner-layout">
                    <div className="app-inner-layout__header-boxed p-0">
                        <div className="app-inner-layout__header page-title-icon-rounded text-white bg-premium-dark mb-4">
                            <PageTitle
                                heading="Customer Dashboard"
                            />
                        </div>
                    </div>
                    <Tabs tabsWrapperClass="body-tabs body-tabs-layout body-tabs-big" transform={false} showInkBar={true} items={getTabs()}/>
                </div>
            </Fragment>
        )
    }
}
