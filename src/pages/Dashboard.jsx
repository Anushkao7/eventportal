import React from 'react';
import Cur from '../comp/cru/cur';
import Events from '../comp/card/Events';

const Dashboard = () => {
    return (
        <div className='dash'>
            <Cur />
            <Events />
        </div>
    );
};

export default Dashboard;