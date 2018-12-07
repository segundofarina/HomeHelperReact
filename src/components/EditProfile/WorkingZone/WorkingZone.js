import React, { Component } from 'react'
import styles from './WorkingZone.module.css'
import Panel from '../../UI/Panel/Panel'
import {Map, GoogleApiWrapper} from 'google-maps-react'
import Polygon from './CustomPolygon/CustomPolygon'
import axios from 'axios'
const MY_API_KEY = "AIzaSyBqSX1WHUw4OlgMDzYM40uSVPGkV06DR1I"

class WorkingZone extends Component {
    state = {
        isEditing: false,
        coords: this.props.coords,
        lastCoords: this.props.coords,
        loading: false,
        error: false,
    }

    handleEditClick = () => {
        this.setState({isEditing: true})
    }

    handleCancelClick = () => {
        this.setState({isEditing: false, coords: this.state.lastCoords})
    }

    handleSaveClick = () => {
        /* Validate coords */
        this.setState({isEditing: false, lastCoords: this.state.coords, loading: true})
        //post to the api
        try {
            axios.put(`/providers/${this.props.providerId}`,{
                coordenates: this.state.coords,
            })

            this.setState({loading: false})
        } catch (error) {
            console.log('error')
            this.setState({error: true})
        }
    }

    handleUpdateCoord = (coords) => {
        const newCoords = [...coords]
        const firtsCoord = newCoords[0]
        const lastCoords = newCoords[newCoords.length - 1]
        if(firtsCoord.lat === lastCoords.lat && firtsCoord.lng === lastCoords.lng) {
            newCoords.slice(0, newCoords.length-1)
        }
        this.setState({coords: newCoords})
    }

    center = {lat: '', lng: ''}

    componentDidMount () {
        const {google} = this.props;
        const maps = google.maps;

        google.maps.Polygon.prototype.getBounds = function() {
            var bounds = new google.maps.LatLngBounds();
            var paths = this.getPaths();
            var path;        
            for (var i = 0; i < paths.getLength(); i++) {
                path = paths.getAt(i);
                for (var ii = 0; ii < path.getLength(); ii++) {
                    bounds.extend(path.getAt(ii));
                }
            }
            return bounds;
        }

        let bermudaTriangle = new maps.Polygon({paths: this.state.coords});
        this.center = {lat: bermudaTriangle.getBounds().getCenter().lat(),
                    lng:bermudaTriangle.getBounds().getCenter().lng()
            }
    }

    render () {
       let actionsBtns = (
            <div className={styles.EditDescriptionBtn} onClick={this.handleEditClick}>Edit</div>
        )
        if(this.state.isEditing) {
           actionsBtns = (
                <div className={styles.ActionBtns}>
                    <div className={styles.CancelDescriptionBtn} onClick={this.handleCancelClick}>Cancel</div>
                    <div className={styles.SaveDescriptionBtn} onClick={this.handleSaveClick}>Save</div>
                </div>
            )
        }

        if(this.state.loading) {
            actionsBtns = (
                <div className={styles.ActionsLoading}>
                    <div className={styles.Bounce1}></div>
                    <div className={styles.Bounce2}></div>
                    <div className={styles.Bounce3}></div>
                </div>
            )
        }
        if(this.state.error) {
            actionsBtns = (
                <div className={styles.ActionBtns}>
                    <p className={styles.ApiError}>Error while connecting to the server</p>
                    <div className={styles.SaveDescriptionBtn} onClick={this.handleSaveClick}>Try again</div>
                </div>
            )
        }


        let polygon = (
            <Polygon
                paths={this.state.coords}
                strokeColor="#17b594"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#26b99a"
                fillOpacity={0.35}
                editable={false}
                onUpdateCoord={this.handleUpdateCoord} />
        )
        if(this.state.isEditing) {
            polygon = (
                <Polygon
                    paths={this.state.coords}
                    strokeColor="#17b594"
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor="#26b99a"
                    fillOpacity={0.35}
                    editable={true}
                    onUpdateCoord={this.handleUpdateCoord} />
            )
        }

        return (
            <div className={styles.WorkingZoneEditor}>
                <div className={styles.Title}>
                    <h3 className={styles.WorkingZoneTitle}>Working Zone</h3>
                    {actionsBtns}
                </div>
                <Panel className={styles.Panel}>
                    <div className={styles.MapContainer}>
                        <Map google={this.props.google} zoom={10} style={{width: '100%', height: '100%', position: 'relative'}}
                                initialCenter={this.center}
                                onReady={adjustMap}>
                            {polygon}
                       </Map>
                    </div>
               </Panel>
            </div>
        )
    }
}

const adjustMap= (mapProps, map)=> {
    const {google, children} = mapProps;
    const bounds = new google.maps.LatLngBounds();
    const coordenates = children.props.paths    

    for (var i = 0; i < coordenates.length; i++) {
        bounds.extend(coordenates[i]);
    }
  
    map.fitBounds(bounds);
}

export default GoogleApiWrapper({apiKey: (MY_API_KEY)})(WorkingZone)