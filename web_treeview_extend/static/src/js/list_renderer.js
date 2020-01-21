odoo.define('web_treeview_extend.ListRenderer', function (require) {
"use strict";

var ListRenderer = require('web.ListRenderer');



ListRenderer.include({

    _renderHeaderTreeMerge: function (group_name) {
        var $tr_mg = $('<tr>')
        var title_mg = this.columns[0].attrs.modifiers[group_name] || "";
        var count_title_mg = 0;

        if (!_.find(this.columns, function(column){ return column.attrs.modifiers[group_name]})) { 
            return '';
        }
        var th_tag = '<th class="qth_header_treewiew text-center" style="min-width: 10px; max-width: 20px;" colspan="1"></th>'
        $tr_mg.append(th_tag);
        _.each(this.columns, function(column) {
            if (column.attrs.modifiers[group_name] !== title_mg) {
                th_tag = '<th class="qth_header_treewiew text-center" colspan="'+count_title_mg+'">'+title_mg+'</th>';
                $tr_mg.append(th_tag);
                title_mg = column.attrs.modifiers[group_name] || "";
                count_title_mg = 1;
            } else {
                count_title_mg++;
            }
        });
        th_tag = '<th class="qth_header_treewiew text-center" colspan="'+count_title_mg+'">'+title_mg+'</th>';
        return $tr_mg.append(th_tag);
    },

    _renderHeader: function () {
        var $thead = $('<thead>')

        $thead.append(this._renderHeaderTreeMerge('merge_group3'))
        $thead.append(this._renderHeaderTreeMerge('merge_group2'))
        $thead.append(this._renderHeaderTreeMerge('merge_group1'))

        var $tr = $('<tr>')
            .append(_.map(this.columns, this._renderHeaderCell.bind(this)));
        if (this.hasSelectors) {
            $tr.prepend(this._renderSelector('th'));
        }
        return $thead.append($tr);
    },

});

});