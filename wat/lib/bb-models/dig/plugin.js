Wat.Models.Plugin = Wat.Models.DIG.extend({
    defaults: {
    },
    
    initialize: function (attrs, opts) {
        this.pluginId = opts.pluginId;
        this.osdId = opts.osdId;
        
        Backbone.Model.prototype.initialize.apply(this, [attrs]);
        
        this.urlRoot = this.baseUrl() + '/osd/' + opts.osdId + '/' + opts.pluginId;
    },
    
    mock: function () {
        var data = {};
        
        switch (this.pluginId) {
            case 'os':
                data = {}
                break;
            case 'vma':
                data = {
                    vma_allow_sound:  {
                        value: true,
                        settings: {}
                    },
                    vma_allow_printing:  {
                        value: false,
                        settings: {}
                    },
                    vma_allow_sharing:  {
                        value: true,
                        settings: {}
                    }
                }
                break;
            case 'desktop':
                data = {
                    wallpaper: {
                        value: 2,
                        settings: {}
                    }
                }
                break;
            case 'execution_hooks':
                data = [
                    {
                        script: {
                            value: 10,
                            settings: {
                                execution_hook: 'first_connection'
                            }
                        }
                    },
                    {
                        script: {
                            value: 11,
                            settings: {
                                execution_hook: 'vma.on_state.connected'
                            }
                        }
                    },
                    {
                        script: {
                            value: 12,
                            settings: {
                                execution_hook: 'vma.on_state.expire'
                            }
                        }
                    }
                ]
                break;
            case 'shortcuts':
                data = [
                    {
                        shortcut: {
                            id: 12,
                            name: 'QVD Website',
                            command: 'firefox',
                            icon_url: 'https://www.mozilla.org/media/img/styleguide/identity/firefox/guidelines-logo.7ea045a4e288.png',
                            icon_id: 45
                        }
                    }
                ]
                break;
        }
        
        return data;
    }
});