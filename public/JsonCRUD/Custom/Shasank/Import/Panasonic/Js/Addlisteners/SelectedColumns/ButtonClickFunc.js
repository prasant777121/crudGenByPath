import { StartFunc as StartFuncCheckBeforeFetch } from "./CheckBeforeFetch.js";
import { StartFunc as StartFuncAfterFetch } from "./AfterFetch.js";
import { StartFunc as StartFuncFetchFunc } from "./FetchFunc.js";

let StartFunc = async () => {
    if (StartFuncCheckBeforeFetch()) {

        const input = document.getElementById('csvFileInput');
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async function (e) {
                const csvData = e.target.result;
                const jsonArray = convertCsvToJsonFunction(csvData);
                let response = await StartFuncFetchFunc({ inBodyData: jsonArray });
                StartFuncAfterFetch({ inFromFetch: response });
            };

            reader.readAsText(file);
        } else {
            alert('Please select a CSV file.');
        };
    };

};

let convertCsvToJsonFunction = (csvData) => {
    const parsedData = Papa.parse(csvData, { header: true });
    console.log("parsedData:",parsedData);

    const selectedData = parsedData.data.map(({
        'Job Id': JobId, 'Created Date': CreationDate,Status,
        'Customer Name': CustomerName, Address, 'Mobile No': MobileNo,
        'Contact No': ContactNo, ModelName, 'Job Classification': JobClassification, ProductGroupName, 'Warranty Type': WarrantyType, 'Agent Remarks': AgentRemarks, CallFromNo, "Panasonic":Brand,"Distance Type":DistanceType
    }) => ({ JobId, CreationDate,Status, CustomerName, Address, MobileNo, ContactNo, ModelName, JobClassification, ProductGroupName, WarrantyType, AgentRemarks, CallFromNo,DistanceType, Brand }));

    return selectedData;
}

export { StartFunc };