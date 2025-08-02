import React from 'react'
import useBattery from '@/hooks/useBattery' // path depends on your structure

const BatteryStatus = () => {
  const { level, charging } = useBattery()

  return (
    <div className="text-lime-300 p-4 rounded-xl shadow-lg flex flex-col items-center">
      <p className="text-sm">
        Battery Level: {(level * 100).toFixed(0)}%
      </p>
      <p className="text-sm">
        Charging: {charging ? "On" : "Off"}
      </p>
    </div>
  )
}

export default BatteryStatus
