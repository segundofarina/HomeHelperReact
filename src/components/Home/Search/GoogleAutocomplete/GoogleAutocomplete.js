import React from 'react'
import PlacesAutocomplete from './CustomPlacesAutocomplete/CustomPlacesAutocomplete'
import styles from './GoogleAutocomplete.module.css'

/*global google*/
const googleAutocomplete = (props) => {
    const bounds = new google.maps.LatLngBounds({lat: -34.9, lng: -59}, {lat: -34.3, lng: -58})

    return (
        <PlacesAutocomplete value={props.value}
                            onChange={props.onChange}
                            highlightFirstSuggestion={true}
                            searchOptions={{bounds: bounds}}
                            onSelect={props.onSelect}
                            onError={props.onError} >

            {renderFunc}        

        </PlacesAutocomplete>
    )
}

const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
    const suggestionStyles = [styles.SuggestionsContainer]
    if(loading || suggestions.length > 0) {
        suggestionStyles.push(styles.Active)
    }
    return (
        <div className={styles.GoogleAutocomplete}>
            <div className={styles.InputGroup}>
                <label>Zone:</label>
                <input {...getInputProps({
                    placeholder: 'Search address...',
                    className: styles.Input,
                })} />
            </div>
        <div className={suggestionStyles.join(' ')}>
                {suggestions.slice(0, 5).map(suggestion => {
                    const itemStyles = [styles.ItemStyles]
                    if(suggestion.active) {
                        itemStyles.push(styles.Active)
                    }

                    return (
                        <div {...getSuggestionItemProps(suggestion, {className: itemStyles.join(' ')})}>
                            <span>{suggestion.description}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default googleAutocomplete