import React from 'react';
import { unixToDateTime, routesIcons, distanceInKM } from '../utils';

const TransportResult = (props) => {
  const { plans } = props;

  const li = (item, count, index) => {
    let width = (Number(100 / (count+1)).toFixed(2) - 1) + "%";
    return <React.Fragment>
      <div style={{float: "left", width}} key={item.startTime}>
        <p>
          <b>{unixToDateTime(item.startTime)}</b><br />
          <span>{item.from.name}</span>
          <span style={{paddingLeft: '10px'}}>
            <i className={`fa fa-${routesIcons[item.mode]} fa-2x`} aria-hidden="true"></i>
            <b style={{paddingLeft: '10px'}}>{item.route ? item.route.shortName : ''}</b>
          </span>
        </p>
        <h5>
          {distanceInKM(item.distance)}
        </h5>
      </div>
      {count === (index+1) &&
        <div style={{float: "left", width }} key={item.startTime}>
          <p>
            <b>{unixToDateTime(item.endTime)}</b><br />
            <span>{item.to.name}</span>
          </p>
        </div>
      }
    </React.Fragment>;
  }

  return (
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
  );
};

export default TransportResult;