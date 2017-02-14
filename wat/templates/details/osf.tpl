<div class="details-header">
    <span class="fa fa-flask h1"><%= model.get('name') %></span>
    <div class="clear mobile"></div>
    <a class="button2 fright fa fa-eye js-show-details-actions show-details-actions" data-options-state="hidden" data-i18n="Actions"></a>
    
    <% if(Wat.C.checkACL('osf.delete.')) { %>
    <a class="button fleft button-icon--desktop js-button-delete fa fa-trash" href="javascript:" data-i18n="[title]Delete"><span data-i18n="Delete" class="mobile"></span></a>
    <% } %>
    <% if(Wat.C.checkGroupACL('osfEdit')) { %>
    <a class="button fright button-icon--desktop js-button-edit fa fa-pencil" href="javascript:" data-i18n="[title]Edit"><span data-i18n="Edit" class="mobile"></span></a>
    <% } %>
    
    <div class="clear mobile"></div>
</div>

<table class="details details-list <% if (!enabledProperties) { %> col-width-100 <% } %>">
    <%   
    if (Wat.C.isSuperadmin()) { 
    %>
        <tr>
            <td><i class="<%= CLASS_ICON_TENANTS %>"></i><span data-i18n="Tenant"></span></td>
            <td>
                <%= Wat.C.ifACL('<a href="#/tenant/' + model.get('tenant_id') + '">', 'tenant.see-details.') %>
                <%= model.get('tenant_name') %>
                <%= Wat.C.ifACL('</a>', 'tenant.see-details.') %>
            </td>
        </tr>
    <%   
    }
    if (Wat.C.checkACL('osf.see.id')) { 
    %>
        <tr>
            <td><i class="fa fa-asterisk"></i><span data-i18n="Id"></span></td>
            <td>
                <%= model.get('id') %>
            </td>
        </tr>  
    <% 
    }
    if (Wat.C.checkACL('osf.see.description')) { 
    %>
        <tr>
            <td><i class="fa fa-align-justify"></i><span data-i18n="Description"></span></td>
            <td>
                <% 
                if (model.get('description')) { 
                %>
                    <%= model.get('description').replace(/\n/g, '<br>') %>
                <%
                }
                else {
                %>
                    <span class="second_row">-</span>
                <%
                }
                %>
            </td>
        </tr>
    <% 
    }
    if (detailsFields['overlay'] != undefined) { 
    %>
        <tr>
            <td><i class="fa fa-exchange"></i><span data-i18n="Overlay"></span></td>
            <td>
                <%= model.get('overlay') ? '<span class="fa fa-check"></span>' : '<span class="fa fa-remove"></span>' %>
            </td>
        </tr>
    <% 
    }
    if (detailsFields['memory'] != undefined) { 
    %>
        <tr>
            <td><i class="fa fa-bolt"></i><span data-i18n="Memory"></span></td>
            <td>
                <%= model.get('memory') %> MB
            </td>
        </tr>
    <% 
    }
    if (detailsFields['user_storage'] != undefined) { 
    %>
        <tr>
            <td><i class="fa fa-archive"></i><span data-i18n="User storage"></span></td>
            <td>
                <%
                if (!model.get('user_storage')) {
                %>
                    <span data-i18n="No">
                        <%= i18n.t('No') %>
                    </span>
                <%
                }
                else {
                    print(model.get('user_storage')  + " MB");
                }
                %>
            </td>
        </tr>
    <% 
    }
    if (detailsFields['vms'] != undefined) { 
    %>
        <tr>
            <td><i class="<%= CLASS_ICON_VMS %>"></i><span data-i18n="VMs"></span></td>
            <td>
                <%= Wat.C.ifACL('<a href="#/vms/' + Wat.U.transformFiltersToSearchHash({osf_id: model.get('id')}) + '">', 'vm.see-main.') %>
                <span data-wsupdate="number_of_vms" data-id="<%= model.get('id') %>"><%= model.get('number_of_vms') %></span>
                <%= Wat.C.ifACL('</a>', 'vm.see-main.') %>
            </td>
        </tr>
    <% 
    }
    if (detailsFields['dis'] != undefined) { 
    %>
        <tr>
            <td><i class="<%= CLASS_ICON_DIS %>"></i><span data-i18n="DIs"></span></td>
            <td>
                <%= Wat.C.ifACL('<a href="#/dis/' + Wat.U.transformFiltersToSearchHash({osf_id: model.get('id')}) + '">', 'di.see-main.') %>
                <span data-wsupdate="number_of_dis" data-id="<%= model.get('id') %>"><%= model.get('number_of_dis') %></span>
                <%= Wat.C.ifACL('</a>', 'di.see-main.') %>
            </td>
        </tr>
    <% 
    }
    if (Wat.C.checkACL('osf.see.created-by')) {
    %>
        <tr>
            <td><i class="<%= CLASS_ICON_ADMINS %>"></i><span data-i18n="Created by"></span></td>
            <td>
                <span><%= model.get('creation_admin_name') %></span>
            </td>
        </tr>
    <% 
    }
    if (Wat.C.checkACL('osf.see.creation-date')) {
    %>
        <tr>
            <td><i class="fa fa-clock-o"></i><span data-i18n="Creation date"></span></td>
            <td>
                <span><%= model.get('creation_date') %></span>
            </td>
        </tr>
    <% 
    }
    %>
    <tbody class="bb-properties"></tbody>
</table>