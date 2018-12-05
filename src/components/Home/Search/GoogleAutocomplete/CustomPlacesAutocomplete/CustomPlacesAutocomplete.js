import PlacesAutocomplete from 'react-places-autocomplete'

class CustomPlacesAutocomplete extends PlacesAutocomplete {
    handleInputKeyDown = event => {
      switch (event.key) {
        case 'Enter':
          event.preventDefault()
          this.handleEnterKey()
          break
        case 'ArrowDown':
          event.preventDefault() // prevent the cursor from moving
          this.handleDownKey()
          break
        case 'ArrowUp':
          event.preventDefault() // prevent the cursor from moving
          this.handleUpKey()
          break
        case 'Escape':
          this.clearSuggestions()
          break
        case 'Tab':
//          event.preventDefault()
          this.handleEnterKey()
          break
      }
    }
}

export default CustomPlacesAutocomplete