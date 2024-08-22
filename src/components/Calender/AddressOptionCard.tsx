import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { AddressProps } from '../AddressInput'

type AddressDetails = AddressProps & { index: number, onchageAddress: (item: AddressProps) => void }

function AddressOptionCard({ onchageAddress, index, placeIcon = <CiLocationOn size={30} className='h-100' />, placeName, placeaddress }: AddressDetails) {
  return (
    <div className="list-group-item list-group-item-action" key={index} onClick={() => onchageAddress({ placeName: placeName, placeaddress: placeaddress })}>
      <div className="row">
        <div className="col-1 text-center">
          {placeIcon}
        </div>
        <div className="col-11 ">
          <div className="fs-5">{placeName}</div>
          <div className="form-text">{placeaddress}</div>
        </div>
      </div>
    </div>
  )
}

export default AddressOptionCard