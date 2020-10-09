import React from 'react';

const Addresses = (props) => {
  const { addresses, onAddressSelect } = props;
  const selectedAddress = (addressItem) => {
    onAddressSelect(addressItem);
  };
  return (
    <div className="list-group">
      {addresses.map((item, index) => (
        <button
          type="button"
          className="list-group-item list-group-item-action"
          key={index}
          onClick={() => selectedAddress(item)}
        >
          {item.properties.label}
        </button>
      ))}
    </div>
  );
};

export default Addresses;
