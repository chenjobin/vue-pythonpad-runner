import colors from './colors'

const SVGNS = 'http://www.w3.org/2000/svg'

export default class CanvasDrawer {
    constructor(containerElement) {
        this.containerElement = containerElement
        this.canvasElement = null
        this.svgElement = null
        this.canvasObject = null
        this.objects = {}
        this.elements = {}
        this.initContainer()
    }

    initContainer() {
        const box = document.createElement('div')
        box.style.width = '100%'
        box.style.height = '100%'
        box.style.backgroundColor = '#ffffff'
        box.style.display = 'flex'
        box.style.alignItems = 'center'
        box.style.justifyContent = 'center'
        this.innerContainerElement = box
        this.containerElement.appendChild(box)
    }

    sanitizeColor(color) {
        if (color === null) {
            return 'transparent'
        } else if (Array.isArray(color)) {
            if (color.length === 3) {
                return `rgb(${color.join(',')})`
            } else if (color.length === 4) {
                return `rgba(${color.join(',')})`
            }
        } else {
            try {
                const colorName = color.toLowerCase().replace(/ /g, '')
                if (colors[colorName]) {
                    return `rgb(${colors[colorName].join(',')})`
                }
            } catch (err) {}
        }
        return color
    }

    getTagNameByDrawableType(dtype) {
        switch (dtype) {
            case 'rectangle':
            case 'square':
                return 'rect'

            case 'circle':
                return 'circle'

            case 'ellipse':
                return 'ellipse'

            case 'path':
            case 'polygon':
                return 'path'

            case 'layer':
                return 'g'

            case 'text':
                return 'text'

            default:
                return 'rect'
        }
    }

    setDrawableAttributes(el, drawable) {
        const styles = {}
        const getStyleString = () => Object.entries(styles).map(kv => `${kv[0]}:${kv[1]}`).join(';')
        switch (drawable.type) {
            case 'rectangle':
            case 'square':
                el.setAttributeNS(null, 'x', drawable.initx)
                el.setAttributeNS(null, 'y', drawable.inity)
                el.setAttributeNS(null, 'height', drawable.height)
                el.setAttributeNS(null, 'width', drawable.width)    
                break

            case 'circle':
                el.setAttributeNS(null, 'cx', 0)   
                el.setAttributeNS(null, 'cy', 0)   
                el.setAttributeNS(null, 'r', drawable.radius)   
                break

            case 'ellipse':
                el.setAttributeNS(null, 'cx', 0)
                el.setAttributeNS(null, 'cy', 0)
                el.setAttributeNS(null, 'rx', drawable.width / 2)
                el.setAttributeNS(null, 'ry', drawable.height / 2)
                break

            case 'path':
            case 'polygon':
                el.setAttributeNS(null, 'd', drawable.d)
                break

            case 'text':
                styles['fill'] = this.sanitizeColor(drawable.color)
                styles['font-size'] = `${drawable.size}px`
                el.setAttributeNS(null, 'style', getStyleString())
                el.setAttributeNS(null, 'x', drawable.initx)
                el.setAttributeNS(null, 'y', drawable.inity)
                while (el.firstChild) {
                    el.removeChild(el.lastChild);
                }
                const lines = drawable.text.split('\n')
                for (let i = 0; i < lines.length; i++) {
                    const lineEl = document.createElementNS(SVGNS, 'tspan')
                    lineEl.setAttributeNS(null, 'x', drawable.initx)
                    lineEl.setAttributeNS(null, 'y', drawable.inity + (drawable.size * i))
                    lineEl.appendChild(document.createTextNode(lines[i]))
                    el.appendChild(lineEl)
                }

        }
        if (drawable.fillColor) {
            el.setAttributeNS(null, 'fill', this.sanitizeColor(drawable.fillColor))
        }
        if (drawable.borderColor) {
            el.setAttributeNS(null, 'stroke', this.sanitizeColor(drawable.borderColor))
        }
        if (drawable.borderWidth) {
            el.setAttributeNS(null, 'stroke-width', this.sanitizeColor(drawable.borderWidth))
        }
        el.setAttributeNS(null, 'transform', drawable.transform)
    }

    setCanvasAttributes(el, canvas) {
        el.setAttributeNS(null, 'viewBox', `0 0 ${canvas.width} ${canvas.height}`)
        el.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet')
        const styles = {
            'width': `${canvas.width}px`,
            'height': `${canvas.height}px`,
            'max-width': '100%',
            'max-height': '100%',
            'flex': '0 0 auto',
            'background-color': this.sanitizeColor(canvas.bgColor),
        }
        const styleString = Object.entries(styles).map(kv => `${kv[0]}:${kv[1]}`).join(';')
        el.setAttributeNS(null, 'style', styleString)
    }

    onCreateCanvas(task) {
        this.canvasObject = task.canvas
        this.svgElement = document.createElementNS(SVGNS, 'svg')
        this.setCanvasAttributes(this.svgElement, task.canvas)
        this.innerContainerElement.appendChild(this.svgElement)
        this.objects[task.canvas.id] = task.canvas
        this.elements[task.canvas.id] = this.svgElement
    }

    onRemoveCanvas(task) {
        this.innerContainerElement.removeChild(this.elements[this.canvasObject.id])
        delete this.objects[this.canvasObject.id]
        delete this.elements[this.canvasObject.id]
    }   

    onEditCanvas(task) {
        const el = this.elements[task.canvas.id]
        this.setCanvasAttributes(el, task.canvas)
    }

    onAdd(task) {
        const tagName = this.getTagNameByDrawableType(task.drawable.type)
        const el = document.createElementNS(SVGNS, tagName)
        el.id = `d${task.drawable.id}`
        this.setDrawableAttributes(el, task.drawable)
        this.elements[task.container_id].appendChild(el)
        this.objects[task.drawable.id] = task.drawable
        this.elements[task.drawable.id] = el
    }

    onRemove(task) {
        this.elements[task.container_id].removeChild(this.elements[task.drawable_id])
        delete this.objects[task.drawable_id]
        delete this.elements[task.drawable_id]
    }

    onEdit(task) {
        const el = this.elements[task.drawable.id]
        this.setDrawableAttributes(el, task.drawable)
    }

    onTask(task) {
        switch(task.task) {
            case 'create_canvas':
                this.onCreateCanvas(task)
                break

            case 'remove_canvas':
                this.onRemoveCanvas(task)
                break
            
            case 'edit_canvas':
                this.onEditCanvas(task)
                break

            case 'add':
                this.onAdd(task)
                break

            case 'remove':
                this.onRemove(task)
                break

            case 'edit':
                this.onEdit(task)
                break

            default:
                break
        }
    }
}