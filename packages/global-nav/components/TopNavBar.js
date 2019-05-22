import React from 'react'; import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Search from "./Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import SigEn from '../assets/sig-en.svg';
import SigFr from '../assets/sig-fr.svg';

const TopNavBar = (props) => {
  const {
    minimized,
    currentLang,
    currentApp,
    search,
    onMobileMenuClick,
  } = props;

  const status = (minimized ? false : true);
  const flag = (currentLang === 'en_CA' ? SigEn : SigFr );
  const flagAlt = (currentLang === 'en_CA' ? 'Government of Canada' : 'Gouvernment du Canada' );

  return (
    <div>
      <MediaQuery query="(min-device-width: 1224px)">
        <nav className="top_bar shadow-sm">
          <div className="containerGoC align-self-center">
            <img className="flag" src={flag} alt={flagAlt} />
          </div>
          <a className="gn-app-brand d-flex" href={currentApp.home}>
            <img
              src={currentApp.logo}
              alt=""
              className="gn-app-logo align-self-center"
            />
            <div className="align-self-center">
              {currentApp.name}
            </div>
          </a>
          <div className={
              (minimized) ?
                'searchbox-close search-box' :
                'search-box'
            }>
            <Search
            currentLang={currentLang}
            search={search}
            />
          </div>
        </nav>
      </MediaQuery>
      <MediaQuery query="(max-device-width: 1224px)">
        <div className="bg-dark top-bar-mobile-fip" id="mobileFip" onScroll={() => {console.log('scrollin?')}}>
          <img className="flag" src={flag} alt={flagAlt} />
        </div>
        <nav className="top-bar-mobile shadow-sm" id="mobileNavBar">
          <button
            className="btn mobile-menu-btn"
            onClick={() => onMobileMenuClick()}
          >
            <FontAwesomeIcon icon={faBars} />
            <span className="sr-only">Menu</span>
          </button>
          <a className="gn-app-brand d-flex" href={currentApp.home}>
            <img
              src={currentApp.logo}
              alt=""
              className="gn-app-logo align-self-center"
            />
            <div className="align-self-center">
              {currentApp.name}
            </div>
          </a>
        </nav>
      </MediaQuery>
    </div>
  );
};

TopNavBar.defaultProps = {
  currentApp: {
    name: 'AppName',
    id: '1',
    home: '#',
    logo: ''
  },
  onMobileMenuClick: () => {},
};

TopNavBar.propTypes = {
  /** Current app object name, ID, home link and logo */
  currentApp: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    home: PropTypes.string,
    logo: PropTypes.string,
  }),
  /** Function for parent app to open mobile menu */
  onMobileMenuClick: PropTypes.func,
};

export default TopNavBar;
