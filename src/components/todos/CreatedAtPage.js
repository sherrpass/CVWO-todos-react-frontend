import React from 'react';
import Todos from './Todos';

const CreatedAtPage = () => {
    return (
        <div>
            <Todos title="Most Recent" date="created_at"/>
        </div>
    );
};

export default CreatedAtPage;