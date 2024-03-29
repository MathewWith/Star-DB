import React from 'react';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';
import { withRouter } from 'react-router';

const PeoplePage = ({match, history}) => {

  const {id} = match.params;

    return (
      <Row
        left={<PersonList onItemSelected={(id) => history.push(id)} />}
        right={<PersonDetails itemId={id} />} />
    );
}


export default withRouter(PeoplePage);