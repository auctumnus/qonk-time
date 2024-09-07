import { Maskito } from '@maskito/core'
import {maskitoTimeOptionsGenerator} from '@maskito/kit';

/* -- COMMON -- */

const secondsToMilicere = (seconds: number) => seconds / 0.864

/* -- CURRENT TIME -- */

const startOfToday = () => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
}

const secondsSinceStartOfToday = () => {
    const now = +new Date()
    const start = +startOfToday()
    return (now - start) / 1000
}

const milicereSinceStartOfToday = () => secondsToMilicere(secondsSinceStartOfToday())

const currentQonkTime = () => {
    const totalMilicere = milicereSinceStartOfToday()
    const milicere = Math.floor(totalMilicere % 1000)
    const cere = Math.floor(totalMilicere / 1000)

    return { cere, milicere }
}

const timeKwang = document.getElementById('time-Kwng')!
const timeLatin = document.getElementById('time-Latn')!

setInterval(() => {
    const { cere, milicere } = currentQonkTime()
    const cereStr = cere.toString().padStart(2, '0')
    const milicereStr = milicere.toString().padStart(3, '0')
    const timeStr = `${cereStr}:${milicereStr}`
    timeKwang.textContent = timeStr
    timeLatin.textContent = timeStr
}, 864) // once every milicere

const currentBrowserTimeEl = document.getElementById('current-browser-time')!

setInterval(() => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    const timeStr = `${hours}:${minutes}:${seconds}`
    currentBrowserTimeEl.textContent = timeStr
}, 1000)

/* -- PANEL MANAGEMENT -- */

const timePanel = document.querySelector('.panel.current-time')!
const toolPanel = document.querySelector('.panel.conversion-tools')!

const timePanelButton = document.getElementById('to-time')! as HTMLButtonElement
const toolPanelButton = document.getElementById('to-tools')! as HTMLButtonElement

let currentPanel = 'time'

const toTimePanel = () => {
    toolPanel.classList.add('hidden')
    timePanel.classList.remove('hidden')

    timePanelButton.disabled = true;
    toolPanelButton.disabled = false;

    currentPanel = 'time'
}

const toToolsPanel = () => {
    timePanel.classList.add('hidden')
    toolPanel.classList.remove('hidden')

    toolPanelButton.disabled = true;
    timePanelButton.disabled = false;

    currentPanel = 'tools'
}

timePanelButton.addEventListener('click', toTimePanel)

toolPanelButton.addEventListener('click', toToolsPanel)

window.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && currentPanel === 'tools') {
        toTimePanel()
    } else if (event.key === 'ArrowDown' && currentPanel === 'time') {
        toToolsPanel()
    }
})

window.addEventListener('wheel', event => {
    if(event.deltaY < 0 && currentPanel === 'tools') {
        toTimePanel()
    } else if(event.deltaY > 0 && currentPanel === 'time') {
        toToolsPanel()
    }
})


/* -- TIME CONVERSION -- */

const metricInput = document.getElementById('metric-input')! as HTMLInputElement
const normalInput = document.getElementById('normal-input')! as HTMLInputElement

document.addEventListener('DOMContentLoaded', () => {
    new Maskito(metricInput, {
        mask: [/\d/, /\d/, ':', /\d/, /\d/, /\d/],
    })

    const normalOptions = maskitoTimeOptionsGenerator({
	    mode: 'HH:MM:SS',
	});
    
    new Maskito(normalInput, normalOptions)
})

