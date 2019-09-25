import React, { useState } from "react";
import { connect } from 'react-redux';

import { addTrip, updateDB, deleteInfo } from '../../actions';

const AddTrip = (props) => {
    let id = props.match.params.tripID;
    let matchedTrip;
    let status = (id ? "Edit" : "Add");

    if (id) {
        matchedTrip = props.userTrips.trips.find(trip => Number(id) === trip.id);
        matchedTrip.date = matchedTrip.date.substring(0,10);
    }

    let initialState = (matchedTrip 
        ? matchedTrip 
        :   {
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
        <div>
            {status} a Trip!
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
                <button onClick={(e) => handleSubmit(e)}>{status} Trip</button>
            </form>
            {id && <button onClick={() => handleDelete()}>Delete Entry</button>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userTrips: state.userTrips,
        username: state.username,
    }
}
export default connect(mapStateToProps, {addTrip: addTrip, updateDB : updateDB, deleteInfo : deleteInfo})(AddTrip);