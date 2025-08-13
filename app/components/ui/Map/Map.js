"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import SearchBox from './SearchBox';

// Dynamic imports for Leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// به‌روزرسانی نقشه هنگام تغییر مرکز و اطمینان از invalidateSize
const MapUpdater = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { useMap } = mod;
    return function MapUpdater({ position }) {
      const map = useMap();
      useEffect(() => {
        if (!map || !position) return;
        try {
          map.setView(position, map.getZoom());
          setTimeout(() => {
            try { map.invalidateSize(); } catch {}
          }, 50);
        } catch {}
      }, [map, position]);
      return null;
    };
  }),
  { ssr: false }
);

// کامپوننت برای به‌روزرسانی مرکز نقشه
const ChangeView = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { useMap } = mod;
    return function ChangeView({ center, zoom }) {
      const map = useMap();
      useEffect(() => {
        if (map) {
          map.setView(center, zoom);
        }
      }, [center, zoom, map]);
      return null;
    };
  }),
  { ssr: false }
);

// کامپوننت برای هندل کردن رویداد کلیک روی نقشه
const MapEvents = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { useMapEvents } = mod;
    return function MapEvents({ onMapClick }) {
      useMapEvents({
        click(e) {
          if (onMapClick) {
            onMapClick({ latitude: e.latlng.lat, longitude: e.latlng.lng });
          }
        },
      });
      return null;
    };
  }),
  { ssr: false }
);

// اطمینان از رندر صحیح تایل‌ها پس از تغییر اندازه/چیدمان
const InvalidateSize = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { useMap } = mod;
    return function InvalidateSize({ deps = [] }) {
      const map = useMap();
      useEffect(() => {
        const t = setTimeout(() => {
          try { map.invalidateSize(); } catch {}
        }, 50);
        return () => clearTimeout(t);
      }, deps); // eslint-disable-line react-hooks/exhaustive-deps
      return null;
    };
  }),
  { ssr: false }
);

const Map = ({
  center = [32.383, 48.4], // دزفول به عنوان مرکز پیش‌فرض
  zoom = 13,
  markers = [],
  onMarkerClick,
  onMapClick,
  height = '400px',
  width = '100%',
  className = '',
  showControls = true,
  draggable = true,
  showSearch = true,
}) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapInstance, setMapInstance] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  // اطمینان از بازترسیم تایل‌ها پس از تغییر مرکز یا انتخاب مارکر/ویرایش
  useEffect(() => {
    if (!mapInstance) return;
    const t = setTimeout(() => {
      try { mapInstance.invalidateSize(); } catch {}
    }, 80);
    return () => clearTimeout(t);
  }, [mapInstance, mapCenter, selectedPosition, markers?.length]);

  // بازترسیم هنگام تغییر اندازه کانتینر
  useEffect(() => {
    if (!containerRef.current || !mapInstance) return;
    const ro = new ResizeObserver(() => {
      try { mapInstance.invalidateSize(); } catch {}
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [mapInstance]);

  useEffect(() => {
    // رفع مشکل آیکون‌های پیش‌فرض Leaflet
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const handleMapClick = ({ latitude, longitude }) => {
    setSelectedPosition([latitude, longitude]);
    if (onMapClick) {
      onMapClick({ latitude, longitude });
    }
  };

  return (
    <div 
      style={{ height, width }} 
      className={`rounded-lg overflow-hidden relative ${className}`}
      ref={containerRef}
    >
      {showSearch && (
        <div className="absolute top-2 right-2 z-[1000] w-[min(360px,90%)]">
          <SearchBox
            onSearchSelect={(coords) => {
              setMapCenter(coords);
              setSelectedPosition(coords);
              if (onMapClick) {
                onMapClick({ latitude: coords[0], longitude: coords[1] });
              }
            }}
          />
        </div>
      )}
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={showControls}
        attributionControl={showControls}
        whenCreated={(m) => {
          setMapInstance(m);
          try {
            m.whenReady(() => {
              setTimeout(() => {
                try { m.invalidateSize(); } catch {}
              }, 120);
            });
          } catch {}
        }}
      >
        <MapUpdater position={mapCenter} />
        <InvalidateSize deps={[mapCenter]} />
        <ChangeView center={mapCenter} zoom={zoom} />
        <MapEvents onMapClick={handleMapClick} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* نمایش نشانگرهای موجود */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.latitude, marker.longitude]}
            eventHandlers={{
              click: () => onMarkerClick?.(marker)
            }}
          >
            <Popup>
              {marker.name || `موقعیت ${index + 1}`}
            </Popup>
          </Marker>
        ))}
        
        {/* نمایش موقعیت انتخاب شده */}
        {selectedPosition && (
          <Marker position={selectedPosition}>
            <Popup>
              موقعیت انتخاب شده
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map; 