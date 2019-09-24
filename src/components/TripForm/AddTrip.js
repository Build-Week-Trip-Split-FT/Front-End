import React, { useState } from "react";


const AddTrip = () => {
    
    let [trip, setTrip] = useState(
        {
            username: "",
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
        console.log(trip);
    }

    return (
        <div>
            Add a Trip!
            <form>
                <div onChange={(e) => handleChange(e)}>
                    <label>Username: </label>
                     <input type="text" placeholder="Username" name="username" value={trip.username} />
                </div>
                <div onChange={(e) => handleChange(e)}>
                    <label>Destination: </label>
                    <input type="text" name="destination" placeholder="Destination" value={trip.destination} />
                </div>
                <div onChange={(e) => handleChange(e)}>
                    <label>Date: </label>
                    <input type="text" placeholder="Date" name="date" value={trip.date}/>
                </div>
                <div onChange={(e) => handleChange(e)}>
                    <label>Active Trip: </label>
                    <input type="checkbox" name="active" checked={trip.active}/>
                </div>
                <button onClick={(e) => handleSubmit(e)}>Add Trip</button>
            </form>
        </div>
    )
}

export default AddTrip;