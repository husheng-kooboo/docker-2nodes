const { client } = require('nightwatch-api')
const { Given } = require('cucumber')
let sliderLength
let sliderItemLength
let sliderItemLeft = 0
let currentPosition = 0
let step = 5
let initPic
let movePic


Given(/^open the page and verify the capcha$/, async () => {
  await client.url('https://monoplasty.github.io/vue-monoplasty-slide-verify/')
  // var rem = new Rembrandt({
  //   imageA: 
  // })
  await client.waitForElementVisible('.slide-verify-slider-mask-item-icon')
  await client.getElementSize('.slide-verify-slider', result => {
    
    sliderLength = result.value.width
    console.log(sliderLength)
  })
  await client.getElementSize('.slide-verify-slider-mask-item',result => {
    sliderItemLength = result.value.width
    console.log(result)
    console.log(sliderItemLength)
  })
  try{
    await client.moveToElement('.slide-verify-slider-mask-item',0,0)
  }catch(e){}
  
  await client.mouseButtonDown(0)
  console.log(sliderLength - sliderItemLength)
  await client.saveScreenshot('./init.jpg', result => {
    initPic = result.value
    console.log(initPic)
  })
  while(sliderItemLeft < sliderLength - sliderItemLength - (step + 1)){
    try{
      await client.moveToElement('.slide-verify-slider-mask-item', step, 0)
    }catch(e){}
    currentPosition += 1
    // client.pause(500)
    await client.getAttribute('.slide-verify-slider-mask-item', 'style', result => {
      sliderItemLeft = result.value.split('px')[0].split(':')[1].trim()
      console.log(sliderItemLeft)
    })
    await client.saveScreenshot('./move.jpg', result => {
      movePic = result.value
      // console.log(movePic)
    })
    let count = 0
    let len = initPic.length > movePic.length ? movePic.length : initPic.length
    for(var i = 0; i < len; i++){
      if(initPic[i] != movePic[i])
        count++
    }
    console.log(`init image length: ${initPic.length}, move image length: ${movePic.length}, diff is ${count / len}`)
    console.log(`currentPosition is:${currentPosition}`)
  }
});