import React from 'react'

export default class extends React.Component {
  constructor () {
    super()
    this.state = { components: undefined }
    this.markers = new WeakMap()
  }

  componentDidMount () {
    let {
      Map: LeafletMap,
      Marker,
      TileLayer,
      Tooltip,
      FeatureGroup
    } = require('react-leaflet')
    const { Marker: LeafletMarker } = require('leaflet')
    this.setState({
      leaflet: {
        LeafletMarker
      },
      components: {
        LeafletMap,
        Marker,
        TileLayer,
        Tooltip,
        FeatureGroup
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    this.onUpdateTimeout = setTimeout(() => {
      if (
        prevProps.selectedPlaceId &&
        !this.props.selectedPlaceId &&
        this.featureGroup &&
        this.map
      ) {
        let bounds = this.featureGroup.leafletElement.getBounds()
        this.map.leafletElement.fitBounds(bounds)
      }

      if (!prevState.components && this.state.components) {
        this.map.leafletElement.on('zoomend', this.handleZoomEnd)
      }
    }, 100)
  }

  componentWillUnmount () {
    if (this.map && this.map.leafletElement) {
      this.map.leafletElement.off('zoomend', this.handleZoomEnd)
    }

    window.clearTimeout(this.onUpdateTimeout)
  }

  handleZoomEnd = ({ target }) => {
    const contained = []
    Object.keys(target._layers).forEach(id => {
      let layer = target._layers[id]
      if (layer instanceof this.state.leaflet.LeafletMarker) {
        if (target.getBounds().contains(layer.getLatLng())) {
          contained.push(layer)
        }
      }
    })

    if (this.props.onZoomEnd) this.props.onZoomEnd(contained, target.getZoom())
  }

  render () {
    if (!this.state.components) {
      return null
    }

    const {
      LeafletMap,
      Marker,
      TileLayer,
      Tooltip,
      FeatureGroup
    } = this.state.components
    const { center, data, selectedPlaceId, onMarkerClick } = this.props

    let zoom = 14
    let mapCenter = center
    let selectedPlace
    if (selectedPlaceId) {
      selectedPlace = data.find(d => d.id === selectedPlaceId)
      const { longitude, latitude } = selectedPlace.coordinates
      mapCenter = [latitude, longitude]
      zoom = 18
    }

    const markers = (selectedPlace ? [selectedPlace] : data).map(d => {
      const { latitude, longitude } = d.coordinates
      return (
        <Marker
          ref={node => {
            if (!node) return
            this.markers.set(node.leafletElement, d.id)
          }}
          key={d.id}
          position={[latitude, longitude]}
          onClick={() => {
            if (onMarkerClick) {
              onMarkerClick(d)
            }
          }}
        >
          <Tooltip>
            <span>
              {d.name}
            </span>
          </Tooltip>
        </Marker>
      )
    })

    return (
      <LeafletMap
        ref={node => {
          this.map = node
        }}
        css={`height: 100%; width: 100%; z-index: 0;`}
        center={mapCenter}
        zoom={zoom}
        maxZoom={18}
      >
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <FeatureGroup
          ref={node => {
            this.featureGroup = node
          }}
        >
          {markers}
        </FeatureGroup>
      </LeafletMap>
    )
  }
}
