// jQuery:
$(document).ready(function() {

    // sort table data:
    $(document).on("click", "table thead tr th:not(.no-sort)", function() {
        let table = $(this).parents("table");
        let rows  = $(this).parents("table").find("tbody tr").toArray().sort(TableComparer($(this).index()));
        let dir   = ($(this).hasClass("sort-asc")) ? "desc" : "asc";

        if (dir == "desc") {
            rows = rows.reverse();
        }

        for (let i = 0; i < rows.length; i++) {
            table.append(rows[i]);
        }

        table.find("thead tr th").removeClass("sort-asc").removeClass("sort-desc");
        $(this).removeClass("sort-asc").removeClass("sort-desc") .addClass("sort-" + dir);
    });

});


// table data comparison:
function TableComparer(index) {
    return function (a, b) {
        
        let val_a = TableCellValue(a, index).replace(/\$\,/g, "");
        let val_b = TableCellValue(b, index).replace(/\$\,/g, "");
        let result = val_a.toString().localeCompare(val_b);
        
        if ($.isNumeric(val_a) && $.isNumeric(val_b)) {
            result = val_a - val_b;
        }
        
        if (isDate(val_a) && isDate(val_b)) {
            let date_a = new Date(val_a); 
            let date_b = new Date(val_b);
            result = date_a - date_b;
        }
        
        return result;
    }
}


// get table cell value:
function TableCellValue(row, index) {
    return $(row).children("td").eq(index).text();
}


// date validation:
function isDate(val) {
    let d = new Date(val);
    
    return !isNaN(d.valueOf());
}
