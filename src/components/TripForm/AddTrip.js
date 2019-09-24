import React, { useState } from "react";
import { connect } from 'react-redux';

import { addTrip } from '../../actions';

const AddTrip = (props) => {
    let [trip, setTrip] = useState(
        {
            username: props.username,
            destination:"",
            date: new Date(),
            active: true
        }
    )
    // const addNewTrip = (e) => {
    //     e.preventDefault();
    //     setTrip({...trip})
    // }
    
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
        <div>
            Add a Trip!
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
                <button onClick={(e) => handleSubmit(e)}>Add Trip</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.username,
    }
}
export default connect(mapStateToProps, {addTrip: addTrip})(AddTrip);