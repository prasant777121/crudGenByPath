import { StartFunc as StartFuncFetchFunc } from "../../DeleteButton/FetchFunc.js";

const StartFunc = () => {
    var $table = $('#table');
    let jVarLocalTableData = localStorage.getItem("tableData");
    let jVarLocalTableDataParsed = JSON.parse(jVarLocalTableData);
    console.log("jVarLocalTableDataParsed : ", jVarLocalTableDataParsed);
    $table.bootstrapTable('destroy');

    $table.bootstrapTable({
        onPostBody: function () {
            $(".fixed-table-toolbar .search .search-input").focus()
        },
        // onClickRow: LocalOnClickRow,
        columns: JFLocalColumns(),
        data: jVarLocalTableDataParsed
    });
};

let LocalOnClickRow = async (row, $element, field) => {
    if (field === 0) {
        let LocalFromSwal = await swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!"
        });

        if (LocalFromSwal.isConfirmed) {
            console.log("row : ", row);
            if ("UuId" in row) {
                StartFuncFetchFunc({ inUuId: row.UuId });
            } else {
                StartFuncFetchFunc({ inUuId: row.id });
            };
        };
    };
};

const JFLocalColumns = () => {
    let jVarLocalDataFromLocalStorage = localStorage.getItem("tableData");

    let LocalColumnsKeysArray = Object.keys(JSON.parse(jVarLocalDataFromLocalStorage)[0]);
    let JVarLocalColumnsArray = [];
    
    // comment this line if u don't want have delete column the in the table

    // JVarLocalColumnsArray.push({ title: "Delete", formatter: "operateFormatter" })

    JVarLocalColumnsArray.push(...LocalColumnsKeysArray.map(element => {
        let LocalObj = {};
        LocalObj.field = element;
        LocalObj.title = element;
        return LocalObj
    }));

    return JVarLocalColumnsArray;
};

export { StartFunc };