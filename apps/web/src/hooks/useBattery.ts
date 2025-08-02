import { useEffect, useState } from 'react'

export default function useBattery(){
  const [batteryInfo, setBatteryInfo] = useState({
    level: 1,
    charging: false,
  })

  useEffect(() => {
    let battery: any

    const getBatteryInfo = async () => {
      try {
        battery = await (navigator as any).getBattery()
        const updateBatteryInfo = () => {
          setBatteryInfo({
            level: battery.level,
            charging: battery.charging,
          })
        }

        updateBatteryInfo()

        // Add event listeners
        battery.addEventListener('chargingchange', updateBatteryInfo)
        battery.addEventListener('levelchange', updateBatteryInfo)
      } catch (error) {
        console.error('Battery API not supported or error:', error)
      }
    }

    getBatteryInfo()

    return () => {
      if (battery) {
        battery.removeEventListener('chargingchange', () => {})
        battery.removeEventListener('levelchange', () => {})
      }
    }
  }, [])

  return batteryInfo
}
