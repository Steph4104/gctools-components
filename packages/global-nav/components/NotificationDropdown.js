/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import notificationBell from '../assets/notification-bell.gif';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

  const GET_NOTIFICATIONS = gql`
  query notifications($gcID: String!){
    notifications(gcID:$gcID, actionLevel:"Featured"){
      id,
      email{
        subject,
      }
    }
  }
`;
const NotificationDropdown = (props) => {
  const {
    userObject,
    accessToken,
  } = props;
  const gcID = '';
  if(userObject){
    const gcID = userObject.sub;
  }

    return (
      <div>
         {userObject ? (
          
          <Query
            query={GET_NOTIFICATIONS}
            variables={{ gcID }}
          >
            {({ loading, error, data }) => {
              if (loading) return 'loading...';
              if (error) return `Error!: ${error}`;
              return (
               <div className="query-maybe-it-might-get-mad">
                <UncontrolledDropdown direction="left">
                  <DropdownToggle className="gn-dd-btn d-flex">
                    <div className="align-self-center">
                      <img src={notificationBell} alt="" />
                    </div>
                    <div className="align-self-center pl-2">
                      Notifications
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    {data.notifications.map(notif => (
                      <DropdownItem key={notif.id}>
                        {notif.email.subject}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              );
          }}
          </Query>
        ) : ''}
      </div>
    );
  };



export default NotificationDropdown;