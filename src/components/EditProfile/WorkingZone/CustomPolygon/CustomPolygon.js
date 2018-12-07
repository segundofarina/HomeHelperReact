import React from 'react';
import PropTypes from 'prop-types';

import { arePathsEqual } from './Utils/arPathEqual';
import { camelize } from './Utils/String';
const evtNames = ['click', 'mouseout', 'mouseover'];

const wrappedPromise = function() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class Polygon extends React.Component {
  componentDidMount() {
    this.polygonPromise = wrappedPromise();
    this.renderPolygon();
  }

  componentDidUpdate(prevProps) {
    if(this.props.editable !== prevProps.editable) {
      this.polygon.setMap(null)
      this.renderPolygon()
    }
    if (
      this.props.map !== prevProps.map ||
      !arePathsEqual(this.props.paths, prevProps.paths)
    ) {
      if (this.polygon) {
        this.polygon.setMap(null);
      }
      this.renderPolygon();
    }
  }

  componentWillUnmount() {
    if (this.polygon) {
      this.polygon.setMap(null);
    }
  }

  renderPolygon() {
    const {
      map,
      google,
      paths,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      editable,
      ...props
    } = this.props;

    if (!google) {
        return null;
    }

    const params = {
      map,
      paths,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      editable,
      ...props
    };

    this.polygon = new google.maps.Polygon(params);

    evtNames.forEach(e => {
      this.polygon.addListener(e, this.handleEvent(e));
    });

    this.polygon.getPaths().forEach(path => {
        google.maps.event.addListener(path, 'insert_at', () => {
            const coords = []
            for (let i =0; i < path.getLength(); i++) {
                let xy = path.getAt(i);
                coords.push({
                    lat: xy.lat(),
                    lng: xy.lng(),
                })
            }

            this.props.onUpdateCoord(coords)
        })

        google.maps.event.addListener(path, 'remove_at', () => {
            const coords = []
            for (let i =0; i < path.getLength(); i++) {
                let xy = path.getAt(i);
                coords.push({
                    lat: xy.lat(),
                    lng: xy.lng(),
                })
            }

            this.props.onUpdateCoord(coords)
        })

        google.maps.event.addListener(path, 'set_at', () => {
            const coords = []
            for (let i =0; i < path.getLength(); i++) {
                let xy = path.getAt(i);
                coords.push({
                    lat: xy.lat(),
                    lng: xy.lng(),
                })
            }

            this.props.onUpdateCoord(coords)
        })
    })

    this.polygonPromise.resolve(this.polygon);
  }

  getPolygon() {
    return this.polygonPromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.polygon, e);
      }
    }
  }

  render() {
    return null;
  }
}

Polygon.propTypes = {
  paths: PropTypes.array,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number
}

evtNames.forEach(e => Polygon.propTypes[e] = PropTypes.func)

Polygon.defaultProps = {
  name: 'Polygon'
}

export default Polygon