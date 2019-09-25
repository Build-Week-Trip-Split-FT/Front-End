import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button } from 'antd';

import { addTrip, updateDB } from '../../actions';
import styled from "styled-components";

//  START OF STYLED COMPONENTS

const TripDiv = styled.div`
    display: flex;
    flex-flow: column;
    align-content: center;
    background-color: white;
    align-items: center;
    width: 50%;
    height: 30vh;
    border-radius: 15px;
`;

const AlignDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const Title = styled.h2`
    margin-top: 3%;
    font-weight: bold;
`;

//END OF STYLED COMPONENTS

const AddTrip = (props) => {
    let id = props.match.params.tripID;
    let matchedTrip;
    if (id) {
        matchedTrip = props.userTrips.trips.find(trip => Number(id) === trip.id);
    }
    console.log(matchedTrip)
    // let initialState = (id ? )
    let [trip, setTrip] = useState (
        {
            username: props.username,
            destination:"",
            date: new Date(),
            active: true
        }
    )
    
    const handleChange = (e) => {
        if (e.target.name === "active") {
            setTrip({...trip, active: !trip.active});
        } else {
            setTrip({...trip, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addTrip(trip);
        props.history.push('/trips');
    }

    return (
        <AlignDiv>
            <TripDiv>
                <Title>Add a Trip!</Title>
                <form>
                    <div >
                        <label>Destination: </label>
                        <input type="text" name="destination" placeholder="Destination" value={trip.destination} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div >
                        <label>Date: </label>
                        <input type="date" placeholder="Date" name="date" value={trip.date} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div >
                        <label>Active Trip: </label>
                        <input type="checkbox" name="active" checked={trip.active} onChange={(e) => handleChange(e)}/>
                    </div>
                    <Button type="primary" onClick={(e) => handleSubmit(e)}>Add Trip</Button>
                </form>
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
export default connect(mapStateToProps, {addTrip: addTrip, updateDB : updateDB})(AddTrip);