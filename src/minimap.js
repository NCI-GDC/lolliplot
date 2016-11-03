// @flow

import { dim, halfPixel } from './spatial'
import theme from './theme'

type TSetupMinimapArgs = {
  svg: Object,
  width: number,
  height: number,
  yAxisOffset: number,
  xAxisOffset: number,
  xAxisLength: number,
  proteinHeight: number,
  domainWidth: number,
  statsBoxWidth: number,
}
type TSetupMinimap = (args: TSetupMinimapArgs) => void
let setupMinimap: TSetupMinimap = props => {
  props.svg
    .append(`g`)
    .append(`rect`)
    .attrs({
      class: `minimap`,
      x: props.yAxisOffset,
      y: props.height - props.xAxisOffset + props.proteinHeight + 20,
      ...dim(props.xAxisLength, 50),
      stroke: `rgb(138, 138, 138)`,
      fill: `rgb(212, 212, 212)`,
      cursor: `text`,
    })

  props.svg
    .append(`g`)
    .append(`clipPath`)
    .attr(`id`, `minimap-clip`)
    .append(`rect`)
    .attrs({
      x: props.yAxisOffset,
      y: props.height - props.xAxisOffset + props.proteinHeight + 20,
      ...dim(props.xAxisLength, 50),
    })

  props.svg
    .append(`g`)
    .append(`rect`)
    .attrs({
      class: `minimap-zoom-area`,
      x: props.yAxisOffset + halfPixel,
      y: props.height - props.xAxisOffset + props.proteinHeight + 20 + halfPixel,
      ...dim(props.xAxisLength - 1, 50 - 1),
      fill: `rgb(255, 255, 255)`,
      'pointer-events': `none`,
    })

  props.svg
    .append(`g`)
    .append(`text`)
    .text(`
      Three ways to zoom in or out:
      1) Click on a domain above.
      2) Click and drag over the main chart above.
      3) Click and drag over the gene map below.
    `)
    .attrs({
      class: `minimap-label`,
      x: props.yAxisOffset,
      y: props.height - props.xAxisOffset + props.proteinHeight + 15,
      'font-size': `11px`,
    })

  props.svg
    .append(`g`)
    .append(`line`)
    .attrs({
      class: `minimap-protein-mutation-divider`,
      x1: props.yAxisOffset,
      y1: props.height - props.xAxisOffset + props.proteinHeight + 60 - halfPixel,
      x2: props.xAxisLength + props.yAxisOffset,
      y2: props.height - props.xAxisOffset + props.proteinHeight + 60 - halfPixel,
      stroke: theme.black,
    })

  props.svg
    .append(`g`)
    .append(`text`)
    .text(`aa 0`)
    .attrs({
      x: props.yAxisOffset,
      y: props.height - props.xAxisOffset + props.proteinHeight + 90,
      'font-size': `11px`,
      'text-anchor': `middle`,
    })

  props.svg
    .append(`g`)
    .append(`text`)
    .text(`aa ${props.domainWidth}`)
    .attrs({
      x: props.width - props.statsBoxWidth,
      y: props.height - props.xAxisOffset + props.proteinHeight + 90,
      'font-size': `11px`,
      'text-anchor': `middle`,
    })

  props.svg
    .append(`g`)
    .append(`text`)
    .text(`This track represents the whole gene. The white area is the current zoom level.`)
    .attrs({
      x: (props.width - props.statsBoxWidth) / 2,
      y: props.height - props.xAxisOffset + props.proteinHeight + 90,
      'font-size': `11px`,
      'text-anchor': `middle`,
    })
}

/*----------------------------------------------------------------------------*/

export default setupMinimap
