import { argb } from '../utils'

export default {
  workcellCreated ({ workcell, cellStyle }) {
    const fontWeight = cellStyle.fontWeight
    const targetFont = cellStyle.fontFamily.split(',').shift().replace(/\"/g,"") || 'Arial';
    
    workcell.font = {
      ...(workcell.font || {}),
      ...({
        name: targetFont ,
        color: { argb: argb(cellStyle.color) },
        bold: (fontWeight === 'bold' || +fontWeight > 600) ? true : false
      })
    }
  }
}
