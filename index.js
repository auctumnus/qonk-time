

const secondsToMilicere = seconds => seconds / 0.864

const startOfToday = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
}

const secondsSinceStartOfToday = () => {
    const now = new Date()
    const start = startOfToday()
    return (now - start) / 1000
}

const milicereSinceStartOfToday = () => secondsToMilicere(secondsSinceStartOfToday())

const currentQonkTime = () => {
    const totalMilicere = milicereSinceStartOfToday()
    const milicere = Math.floor(totalMilicere % 1000)
    const cere = Math.floor(totalMilicere / 1000)

    return { cere, milicere }
}

const timeKwang = document.getElementById('time-Kwng')
const timeLatin = document.getElementById('time-Latn')

setInterval(() => {
    const { cere, milicere } = currentQonkTime()
    const cereStr = cere.toString().padStart(2, '0')
    const milicereStr = milicere.toString().padStart(3, '0')
    const timeStr = `${cereStr}:${milicereStr}`
    timeKwang.textContent = timeStr
    timeLatin.textContent = timeStr
}, 864) // once every milicere