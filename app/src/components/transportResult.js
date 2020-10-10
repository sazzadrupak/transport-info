import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { unixToDateTime, routesIcons, distanceInKM } from '../utils';

const TransportResult = (props) => {
  const { plans } = props;

  const li = (item, count, index) => {
    let width = (Number(100 / (count + 1)).toFixed(2) - 1) + "%";
    return <React.Fragment key={index} >
      <div style={{ float: "left", width }}>
        <p><b>{unixToDateTime(item.startTime)}</b></p>
        <p>
          <span style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={routesIcons[item.mode]} />
          </span>
          <span className="badge badge-success" style={{ marginLeft: '10px' }}>{item.route ? item.route.shortName : ''}</span>
          <span style={{ marginLeft: "25%" }}>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
          <span className="badge badge-info">{distanceInKM(item.distance)}</span>
        </p>
        {index !== 0 &&
          <p>{item.from.name}</p>
        }
        {/* <h5>
          {distanceInKM(item.distance)}
        </h5> */}
      </div>
      {count === (index + 1) &&
        <div style={{ float: "left", width }} key={item.startTime}>
          <p><b>{unixToDateTime(item.startTime)}</b></p>
          <p>
            <FontAwesomeIcon icon={faMapPin} />
          </p>
        </div>
      }
    </React.Fragment>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-lg-12">
          <ul className="list-group">
            {plans.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.legs.map((leg, index) =>
                  (
                    li(leg, item.legs.length, index)
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransportResult;