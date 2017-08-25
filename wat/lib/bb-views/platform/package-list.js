Wat.Views.PackageListView = Wat.Views.ListView.extend({
    qvdObj: 'package',
    configVisible: false,
    
    // This events will be added to view events
    listEvents: {
        'click .js-add-package-btn': 'addPackage',
        'click .js-delete-package-btn': 'deletePackage',
        'click .js-order-package-down': 'sortDown',
        'click .js-order-package-up': 'sortUp',
        'keypress [name="packages_search"]': 'typeSearch',
        'change select[name="packages-installed-filter"]': 'filter'
    },
    
    initialize: function (params) { 
        this.collection = new Wat.Collections.Packages(params);
        
        Wat.Views.ListView.prototype.initialize.apply(this, [params]);
    },
    
    //Render list with controls (list block)
    renderListBlock: function (that) {
        var that = that || this;
        
        var template = _.template(
            Wat.TPL.packageBlockWrapper, {
                cid: that.cid
            }
        );
        
        $(that.listBlockContainer).html(template);
        
        that.listBlockContainer = '.bb-packages-list';
        
        Wat.Views.ListView.prototype.renderListBlock.apply(that, []);
    },
    
    renderList: function () {
        Wat.Views.ListView.prototype.renderList.apply(this, []);
        Wat.I.chosenElement('[name="packages-installed-filter"]', 'single');
    },
    
    addPackage: function (e) {
        var id = $(e.target).attr('data-id');
        var package = $(e.target).attr('data-package');
        var currentView = Wat.I.getCurrentView('package');
        
        var affectedModel = currentView.collection.where({id: parseInt(id)})[0];
        
        affectedModel.save();
        
        $('.js-add-package-btn[data-id="' + id + '"]').hide();
        $('.js-delete-package-btn[data-id="' + id + '"]').show();
        var template = _.template(
            Wat.TPL.editor_package, {
                package: package,
                id: id,
                configVisible: currentView.configVisible
            }
        );
    },

    deletePackage: function (e) {
        var id = $(e.target).attr('data-id');
        var package = $(e.target).attr('data-package');
        var currentView = Wat.I.getCurrentView('package');
        
        var affectedModel = new Wat.Models.Package({id: parseInt(id)});
        
        affectedModel.destroy();
        
        $('li.js-installed-package[data-package="' + package + '"]').remove();
        $('.js-add-package-btn[data-id="' + id + '"]').show();
        $('.js-delete-package-btn[data-id="' + id + '"]').hide();
    },
    
    sortDown: function (e) {
        var item = $(e.target).closest('li');
        var itemNext = item.next();
        
        item.insertAfter(itemNext);
    },
    
    sortUp: function (e) {
        var item = $(e.target).closest('li');
        var itemPrev = item.prev();
        
        item.insertBefore(itemPrev);
    },
    
    typeSearch: function (e) {
        if (e.keyCode == 13) {
            this.filter();
        }
    },
    
    filter: function () {
        // Show loading animation while loading
        $('.' + this.cid).find('.list td').html(HTML_MICRO_LOADING);
        
        var currentView = Wat.I.getCurrentView('package');
        
        // Reset pagination befor filter
        currentView.collection.offset = 1;
        
        currentView.collection.filters.search = $('input[name="packages_search"]').val();
        if ($('select[name="packages-installed-filter"]').val() == 'installed') {
            currentView.collection.filters.installed = true;
        }
        else {
            delete currentView.collection.filters.installed;
        }

        currentView.fetchList();
    }
});