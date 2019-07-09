var googleCommands = {
    do_search: function(keyword) {
        var sec = this.section.search_form
        sec.waitForElementVisible('@search_box')
        sec.setValue('@search_box', keyword)
        this.api.keys(this.api.Keys.ENTER)
        return this
    }
};
  
  

module.exports = {
    url: 'http://www.google.com',
    sections: {
        search_form: {
            selector: 'form',
            elements: {
                search_box: {
                    selector: 'input[name="q"]'
                }
            }
        }
    },
    commands: [googleCommands]
}