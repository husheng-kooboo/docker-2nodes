var dynamicSection = require('../../utils/dynamicSection')

let sections = {
    search_result:{
        selector: '#container',
        sections: {
            left_result: {
                selector: 'div[id="%d"]',
                elements: {
                    title: {
                        selector: 'h3 > a'
                    },
                    description: {
                        selector: '.c-abstract'
                    },
                    url: {
                        selector: '.c-gap-top-small'
                    }
                }
            }
        },
        commands: [{
            getResultById(id) {
                var options = {name: this.sections.left_result.name, parent: this.sections.left_result.parent}
                return dynamicSection(this.sections.left_result, options, id)
            }
        }]
    }
}

module.exports = {
    url: 'https://www.baidu.com',
    sections: sections
}