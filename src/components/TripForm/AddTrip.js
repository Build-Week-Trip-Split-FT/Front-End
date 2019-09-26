import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button, Input } from 'antd';

import { addTrip, updateDB, deleteInfo } from '../../actions';
import styled from "styled-components";

//  START OF STYLED COMPONENTS

const TripDiv = styled.div`
    display: flex;
    flex-flow: column;
    align-content: center;
    background-color: white;
    align-items: center;
    width: 40%;
    height: 250px;
    border-radius: 15px;
    @media (max-width: 500px) {
        width: 70%;
    }
`;

const AlignDiv = styled.div`
    display: flex;
    justify-content: center;
    
`;

const Title = styled.h2`
    margin-top: 25px;
    font-weight: bold;
`;

const NewForm = styled.form`
    display: flex;
    flex-flow: column;
    align-content: center;
    align-times: center;

`

//END OF STYLED COMPONENTS

const AddTrip = (props) => {
    let id = props.match.params.tripID;
    let matchedTrip;
    let status = (id ? "Edit" : "Add");

    if (id) {
        matchedTrip = props.userTrips.trips.find(trip => Number(id) === trip.id);
        matchedTrip.date = matchedTrip.date.substring(0,10);
    }

    let initialState = (matchedTrip ? matchedTrip  : 
        {
            username: props.username,
            destination:"",
            date: new Date().toJSON().substring(0,10),
            active: true
        }
    )

    let [trip, setTrip] = useState(initialState);

    const handleChange = (e) => {
        if (e.target.name === "active") {
            setTrip({...trip, active: !trip.active});
        } else {
            setTrip({...trip, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            let newTrip = {destination: trip.destination, date: trip.date, active: trip.active};
            props.updateDB(`/trips/${id}`, newTrip)
        } else {
            props.addTrip(trip);
        }
        props.history.push('/trips');
    }

    const handleDelete = () => {
        let partial = `/trips/${id}`;
        props.deleteInfo(partial);
        props.history.push("/trips");
    }

    return (
        <AlignDiv>
            <TripDiv>
                <Title>{status} a Trip!</Title>
                <NewForm>
                    <Input
                        type="text"
                        name="destination"
                        placeholder="Add Destination"
                        value={trip.destination}
                        onChange={(e) => handleChange(e)}
                        style={{ width: "100%",
                                 marginTop: 5}}
                    />
                    <Input 
                        type="date"
                        name="date"
                        placeholder="Insert Date"
                        value={trip.date}
                        style={{ marginTop: 10,
                                 marginBottom: 10}}
                        onChange={(e) => handleChange(e)}
                    />
                    <div >
                        <label>Active Trip: </label>
                        <input type="checkbox" name="active" checked={trip.active} onChange={(e) => handleChange(e)}/>
                    </div>
                    {/* <div >
                        <label>Destination: </label>
                        <input type="text" name="destination" placeholder="Destination" value={trip.destination} onChange={(e) => handleChange(e)}/>
                    </div> */}
                    {/* <div >
                        <label>Date: </label>
                        <input type="date" placeholder="Date" name="date" value={trip.date} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div >
                        <label>Active Trip: </label>
                        <input type="checkbox" name="active" checked={trip.active} onChange={(e) => handleChange(e)}/>
                    </div> */}
                    <Button type="primary" onClick={(e) => handleSubmit(e)} style={{ marginTop: 10}}>{status} Trip</Button>
                </NewForm>
                {id && <Button type="danger" style={{ marginTop: 10}} onClick={() => handleDelete()}>Delete Trip</Button>}
            </TripDiv>
        </AlignDiv>
    )
}

const mapStateToProps = state => {
    return {
        userTrips: state.userTrips,
        username: state.username,
    }
}
export default connect(mapStateToProps, {addTrip: addTrip, updateDB : updateDB, deleteInfo : deleteInfo})(AddTrip);