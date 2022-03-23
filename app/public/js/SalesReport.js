 
$(function(){
    $.get("/data", (data) => {
   
    var pivotgrid = $("#pivotgrid").dxPivotGrid({
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        allowExpandAll: true,
        showBorders: true,
        onContextMenuPreparing: contextMenuPreparing,
        height: 570,
        fieldChooser: {
            enabled: true
        },
        fieldPanel: {
            visible: true
        },
        stateStoring: {
            enabled: true,
            type: "localStorage",
            storageKey: "dx-widget-gallery-pivotgrid-storing"
        },
        dataSource: {
            fields: [{
                caption: "name",
                width: 220,
                dataField: "name",
                area: "row",
                sortBySummaryField: "name"
            }, {
                caption: "product_type",
                dataField: "product_type",
                width: 150,
                area: "row"
            }, {
                dataField: "product_group",
                dataType: "product_group",
                area: "column"
            }, {
                groupName: "date",
                groupInterval: "year"
            }, {
                groupName: "date",
                groupInterval: "quarter"
            }, {
                dataField: "quantity",
                dataType: "number",
                summaryType: "sum",
                format: "fixedPoint",
                area: "data"
            }],
            store: data.products
        }
       
    }).dxPivotGrid("instance");
    
    $("#reset").dxButton({
        text: "Reset the PivotGrid's State",
        onClick: function() {
            pivotgrid.getDataSource().state({});
        }
    });
    
    function contextMenuPreparing(e) {
        var dataSource = e.component.getDataSource(),
            sourceField = e.field;
    
        if (sourceField) {
            if(!sourceField.groupName || sourceField.groupIndex === 0) {
                e.items.push({
                    text: "Hide field",
                    onItemClick: function () {
                        var fieldIndex;
                        if(sourceField.groupName) {
                            fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
                        } else {
                            fieldIndex = sourceField.index;
                        }
    
                        dataSource.field(fieldIndex, {
                            area: null
                        });
                        dataSource.load();
                    }
                });
            }
    
            if (sourceField.dataType === "number") {
                var setSummaryType = function (args) {
                    dataSource.field(sourceField.index, {
                        summaryType: args.itemData.value
                    });
    
                    dataSource.load();
                },
                menuItems = [];
    
                e.items.push({ text: "Summary Type", items: menuItems });
    
                $.each(["Sum", "Avg", "Min", "Max"], function(_, summaryType) {
                    var summaryTypeValue = summaryType.toLowerCase();
    
                    menuItems.push({
                        text: summaryType,
                        value: summaryType.toLowerCase(),
                        onItemClick: setSummaryType,
                        selected: e.field.summaryType === summaryTypeValue
                    });
                });
            }
            
        }
              
         
    }
    
});
})