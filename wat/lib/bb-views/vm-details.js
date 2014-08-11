Wat.Views.VMDetailsView = Wat.Views.DetailsView.extend({
    editorTemplateName: 'editor-vm',
    detailsTemplateName: 'details-vm',
    detailsSideTemplateName: 'details-vm-side',
    sideContainer: '.bb-details-side',
    
    breadcrumbs: {
        'screen': 'Home',
        'link': '#/home',
        'next': {
            'screen': 'Virtual machine list',
            'link': '#/vms',
            'next': {
                'screen': ''
            }
        }
    },
    
    editorDialogTitle: function () {
        return $.i18n.t('Edit Virtual machine') + ": " + this.model.get('name');
    },


    initialize: function (params) {
        this.model = new Wat.Models.VM(params);
        Wat.Views.DetailsView.prototype.initialize.apply(this, [params]);
    },
    
    render: function () {
        // Add name of the model to breadcrumbs
        this.breadcrumbs.next.next.screen = this.model.get('name');
        
        Wat.Views.DetailsView.prototype.render.apply(this);
        
        this.templateDetailsSide = Wat.A.getTemplate(this.detailsSideTemplateName);
        
        this.template = _.template(
            this.templateDetailsSide, {
                model: this.model
            }
        );
        
        $(this.sideContainer).html(this.template);
    },
    
    editElement: function() {
        Wat.Views.DetailsView.prototype.editElement.apply(this);
        
        // Virtual machine form include a date time picker control, so we need enable it
        Wat.I.enableDataPickers();
    },
    
    updateElement: function (dialog) {
        Wat.Views.DetailsView.prototype.updateElement.apply(this, [dialog]);
        
        // Properties to create, update and delete obtained from parent view
        var properties = this.properties;
        
        var arguments = {'properties' : properties};
        
        var context = $('.' + this.cid + '.editor-container');
        
        
        var name = context.find('input[name="name"]').val();
        arguments['name'] = name;      
        
        // If expire is checked
        if (context.find('input.js-expire').is(':checked')) {
            var expiration_soft = context.find('input[name="expiration_soft"]').val();
            var expiration_hard = context.find('input[name="expiration_hard"]').val();
            
            if (!expiration_soft) {
                console.error('undefined soft expiration');
            }
            else {
                arguments['expiration_soft'] = expiration_soft;
            }
            
            if (!expiration_hard) {
                console.error('undefined hard expiration');
            }
            else {
                arguments['expiration_hard'] = expiration_hard;
            }
        }  
        
        var di_tag = context.find('input[name="di_tag"]').val(); 
        arguments['di_tag'] = di_tag;

        var blocked = context.find('input[name="blocked"][value=1]').is(':checked');
        arguments['blocked'] = blocked ? 1 : 0;
        
        var filters = {"id": this.id};
        
        Wat.A.performAction('update_vm', filters, arguments);
        
        this.fetchDetails();
        
        dialog.dialog('close');
    },
    
    bindEditorEvents: function() {
        Wat.Views.DetailsView.prototype.bindEditorEvents.apply(this);
        
        // Toggle controls for new password
        this.bindEvent('change', 'input[name="change_password"]', this.vmEditorBinds.toggleNewPassword);
    },
    
    vmEditorBinds: {
        toggleNewPassword: function () {
            $('.new_password_row').toggle();
        }
    }
});