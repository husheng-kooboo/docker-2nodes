var googleCommands = {
    do_search: function(keyword) {
        var sec = this.section.search_form
        sec.waitForElementVisible('@search_box')
        sec.setValue('@search_box', keyword)
        return this
    },

    press_enter: function(){
        this.api.keys(this.api.Keys.ENTER)
        return this
    }
};
  
  

module.exports = {
    url: 'https://www.google.com',
    sections: {
        search_form: {
            selector: 'form',
            elements: {
                search_box: {
                    selector: 'input[name="q"]'
                },
                search_button: {
                    selector: 'button[aria-label="Google Search"]'
                }
            }
        }
    },
    commands: [googleCommands]
}