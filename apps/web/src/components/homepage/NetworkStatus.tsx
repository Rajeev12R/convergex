import React from "react"
import useNetwork from "@/hooks/useNetwork"

const NetworkStatus = () => {
  const getConnectionLabel = (
    effectiveType: string | null,
    downlink: number | null
  ) => {
    if (!effectiveType || downlink === null) return "Unknown"

    if (effectiveType === "4g" && downlink > 10) return "5G"
    if (effectiveType === "4g") return "4G"
    if (effectiveType === "3g") return "3G"
    if (effectiveType === "2g") return "2G"
    return "Slow"
  }

  const { downlink, effectiveType, rtt } = useNetwork()

  return (
    <div className="text-lime-300 p-4 rounded-xl shadow-lg flex items-center gap-6">
      {effectiveType && (
        <p>
          Connection: <span className="uppercase">{getConnectionLabel(effectiveType, downlink)}</span>
        </p>
      )}
      {downlink !== null && <p>Downlink:{downlink}Mbps</p>}
      {rtt !== null && <p>RTT:{rtt}ms</p>}
    </div>
  )
}

export default NetworkStatus
