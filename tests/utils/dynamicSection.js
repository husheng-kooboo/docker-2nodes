const util = require('util')
const Section = require('nightwatch/lib/page-object/section')
const dynamicSection = function (section, options, ...selector) {
  return new Section(
    Object.assign({}, section, {
      selector: util.format(section.selector, selector),
      name: `${section.name}:${selector.join('-')}`
    }),options
  )
}

module.exports = dynamicSection