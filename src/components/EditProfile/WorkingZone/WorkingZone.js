import React, { Component } from 'react'
import styles from './WorkingZone.module.css'
import Panel from '../../UI/Panel/Panel'
import {Map, GoogleApiWrapper} from 'google-maps-react'
import Polygon from './CustomPolygon/CustomPolygon'
const MY_API_KEY = "AIzaSyBqSX1WHUw4OlgMDzYM40uSVPGkV06DR1I"

class WorkingZone extends Component {
    state = {
        isEditing: false,
        coords: this.props.coords,
        lastCoords: this.props.coords,
    }

    handleEditClick = () => {
        this.setState({isEditing: true})
    }

    handleCancelClick = () => {
        this.setState({isEditing: false})
    }

    handleSaveClick = () => {
        this.setState({isEditing: false})
        //post to the api
    }

    handleUpdateCoord = (coords) => {
        console.log(coords)
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