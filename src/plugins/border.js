import { argb } from '../utils'
const borderStyleMatrix = {
   thin: {
      solid:'thin',
      dashed:'dashed',
      dotted:'dotted',
      double:'double'
   },
   medium:{
      solid:'medium',
      dashed:'mediumDashed',
      dotted:'mediumDashDot',
      double:'double'
   },   
   thick:{
      solid:'thick',
      dashed:'mediumDashDot',
      dotted:'mediumDashDot',
      double:'double'
   }
}
function getBorderWidthRange(widthValue){
   if(!isNaN(widthValue)){
      if(widthValue <= 2){
         return 'thin';
      }
      if(widthValue < 5){
         return 'medium';
      }
      return 'thick';
   }
   return 'thin';
}

function getMappedBorderStyle(cellStyle,part){
   var borderStyle = cellStyle[`border${captialize(part)}Style`];
   var borderWidth = parseFloat(cellStyle[`border${captialize(part)}Width`]);
   var targetStyle = borderStyleMatrix[getBorderWidthRange(borderWidth)][borderStyle];
   return targetStyle || 'thin';
}
function captialize(str){
    if(str){
       return str.charAt(0).toUpperCase() + str.slice(1) ;
    }
    return str;
}


function getBorderPartStyle(cellStyle,part){
   var style = getMappedBorderStyle(cellStyle,part);
   return {
      style:style,
      color:{ 
         argb: argb(cellStyle[`border${captialize(part)}Color`])         
      }
   }
}

export default {
  workcellCreated ({ workcell, cellStyle }) {
    const color = argb(cellStyle.backgroundColor)
    workcell.border = {
      top: getBorderPartStyle(cellStyle,'top'),
      left: getBorderPartStyle(cellStyle,'left'),
      bottom: getBorderPartStyle(cellStyle,'bottom'),
      right: getBorderPartStyle(cellStyle,'right')
   }   
   
  }
}
