// Select elements
const button = document.querySelector('button');
const logContainer = document.querySelector('#logContainer');
const testBtn = document.getElementById("testBtn");
const test2Btn = document.getElementById("test2Btn");
const test3Btn = document.getElementById("test3Btn");
const test4Btn = document.getElementById("test4Btn");
const test5Btn = document.getElementById("test5Btn");
const test6Btn = document.getElementById("test6Btn");
const updateTest2Btn = document.getElementById("updateTest2Btn");
const updateTest3Btn = document.getElementById("updateTest3Btn");
const updateTest4Btn = document.getElementById("updateTest4Btn");
const updateTest6Btn = document.getElementById("updateTest6Btn");
const insertTest2Btn = document.getElementById("insertTest2Btn");
const insertTest3Btn = document.getElementById("insertTest3Btn");
const insertTest4Btn = document.getElementById("insertTest4Btn");
const insertTest6Btn = document.getElementById("insertTest6Btn");
const deleteTest2Btn = document.getElementById("deleteTest2Btn");
const deleteTest3Btn = document.getElementById("deleteTest3Btn");
const deleteTest4Btn = document.getElementById("deleteTest4Btn");
const deleteTest6Btn = document.getElementById("deleteTest6Btn");
const logoutBtn = document.getElementById("logoutBtn");

let usersDisplayed = false;
let personDisplayed = false;
let productDisplayed = false;
let productInventoryDisplayed = false;
let creditCardDisplayed = false;
let salesOrderDetailDisplayed = false;
let globalUsername = null;
let tableName = ''; // Global variable to store the selected table name

testBtn.onclick = async function(){
    const output = document.getElementById("outputUsers");
    globalUsername = sessionStorage.getItem('username');
    console.log("test:" + globalUsername);
    if(usersDisplayed == true){
        output.textContent = '';
        usersDisplayed = false;
        return;
    }
    if(globalUsername != "Boss"){
        window.alert("Permission Denied");
    }else{
        try {
            const response = await fetch('http://54.161.89.255:3000/Users'); // Replace with your server's address
            if (!response.ok) {
                throw new Error('Failed to fetch users'); // Handle HTTP errors
            }
            const data = await response.json(); // Parse JSON response
            console.log(data); // Log the data to the console
    
            // Optionally display the data on the webpage
            output.textContent = JSON.stringify(data, null, 2); // Pretty print JSON data
            usersDisplayed = true;
        } catch (error) {
            console.error('Error fetching users:', error);
        } 
    }
}

test2Btn.onclick = async function(){
    const output = document.getElementById("outputTest2");
    
    if(personDisplayed == true){
        output.textContent = '';
        personDisplayed = false;
        return;
    }
    try {
        const response = await fetch('http://54.161.89.255:3000/Customer'); // Replace with your server's address
        if (!response.ok) {
            throw new Error('Failed to fetch users'); // Handle HTTP errors
        }
        const data = await response.json(); // Parse JSON response
        console.log(data); // Log the data to the console

        // Optionally display the data on the webpage
        output.textContent = JSON.stringify(data, null, 2); // Pretty print JSON data
        personDisplayed = true;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

test3Btn.onclick = async function(){
    const output = document.getElementById("outputTest3");
    
    if(productDisplayed == true){
        output.textContent = '';
        productDisplayed = false;
        return;
    }
    try {
        const response = await fetch('http://54.161.89.255:3000/Product'); // Replace with your server's address
        if (!response.ok) {
            throw new Error('Failed to fetch users'); // Handle HTTP errors
        }
        const data = await response.json(); // Parse JSON response
        console.log(data); // Log the data to the console

        // Optionally display the data on the webpage
        output.textContent = JSON.stringify(data, null, 2); // Pretty print JSON data
        productDisplayed = true;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

test4Btn.onclick = async function(){
    const output = document.getElementById("outputTest4");
    
    if(productInventoryDisplayed == true){
        output.textContent = '';
        productInventoryDisplayed = false;
        return;
    }
    try {
        const response = await fetch('http://54.161.89.255:3000/ProductInventory'); // Replace with your server's address
        if (!response.ok) {
            throw new Error('Failed to fetch users'); // Handle HTTP errors
        }
        const data = await response.json(); // Parse JSON response
        console.log(data); // Log the data to the console

        // Optionally display the data on the webpage
        output.textContent = JSON.stringify(data, null, 2); // Pretty print JSON data
        productInventoryDisplayed = true;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

test6Btn.onclick = async function(){
    const output = document.getElementById("outputTest6");
    
    if(salesOrderDetailDisplayed == true){
        output.textContent = '';
        salesOrderDetailDisplayed = false;
        return;
    }

    try {
        const response = await fetch('http://54.161.89.255:3000/SalesOrderDetail')

        if (!response.ok) {
            throw new Error('Failed to fetch users'); // Handle HTTP errors
        }
        const data = await response.json(); // Parse JSON response
        console.log(data); // Log the data to the console

        // Optionally display the data on the webpage
        output.textContent = JSON.stringify(data, null, 2); // Pretty print JSON data
        salesOrderDetailDisplayed = true;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

updateTest2Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'Customer'
        let columnsSet, valuesSet, columnsWhere, valuesWhere;
        columnsSet = prompt("Enter the column to set:");
        valuesSet = prompt("Enter the value to set (With ' ' for String):");
        columnsWhere = prompt("Enter the column with condition:");
        valuesWhere = prompt("Enter the values with condition (With ' ' for String):");
        if (!columnsSet || !valuesSet || !columnsWhere || !valuesWhere) {
            alert("All fields are required for the Customer table.");
            return;
        }
        const updateQuery = `UPDATE \`${TableName}\` SET ${columnsSet} = ${valuesSet} WHERE ${columnsWhere} = ${valuesWhere};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeUpdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: updateQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error updating data.";
        }
    }   
}

updateTest3Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'Product'
        let columnsSet, valuesSet, columnsWhere, valuesWhere;
        columnsSet = prompt("Enter the column to set:");
        valuesSet = prompt("Enter the value to set (With ' ' for String):");
        columnsWhere = prompt("Enter the column with condition:");
        valuesWhere = prompt("Enter the values with condition (With ' ' for String):");
        if (!columnsSet || !valuesSet || !columnsWhere || !valuesWhere) {
            alert("All fields are required for the Customer table.");
            return;
        }
        const updateQuery = `UPDATE \`${TableName}\` SET ${columnsSet} = ${valuesSet} WHERE ${columnsWhere} = ${valuesWhere};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeUpdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: updateQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error updating data.";
        }
    }
}

updateTest4Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'ProductInventory'
        let columnsSet, valuesSet, columnsWhere, valuesWhere;
        columnsSet = prompt("Enter the column to set:");
        valuesSet = prompt("Enter the value to set (With ' ' for String):");
        columnsWhere = prompt("Enter the column with condition:");
        valuesWhere = prompt("Enter the values with condition (With ' ' for String):");
        if (!columnsSet || !valuesSet || !columnsWhere || !valuesWhere) {
            alert("All fields are required for the Customer table.");
            return;
        }
        const updateQuery = `UPDATE \`${TableName}\` SET ${columnsSet} = ${valuesSet} WHERE ${columnsWhere} = ${valuesWhere};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeUpdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: updateQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error updating data.";
        }
    }
}

updateTest6Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'OrderDetails'
        let columnsSet, valuesSet, columnsWhere, valuesWhere;
        columnsSet = prompt("Enter the column to set:");
        valuesSet = prompt("Enter the value to set (With ' ' for String):");
        columnsWhere = prompt("Enter the column with condition:");
        valuesWhere = prompt("Enter the values with condition (With ' ' for String):");
        if (!columnsSet || !valuesSet || !columnsWhere || !valuesWhere) {
            alert("All fields are required for the Customer table.");
            return;
        }
        const updateQuery = `UPDATE \`${TableName}\` SET ${columnsSet} = ${valuesSet} WHERE ${columnsWhere} = ${valuesWhere};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeUpdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: updateQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error updating data.";
        }
    }
}

insertTest2Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'Customer';
        let columns, values;
        const customerFirstName = prompt("Enter Customer First Name:");
        const customerLastname = prompt("Enter Customer Last Name:");
        const email = prompt("Enter Customer Email:");
        const phone = prompt("Enter Customer Phone Number:");
        const address = prompt("Enter Customer Address:");
        if (!customerFirstName || !customerLastname || !email || !phone || !address) {
            alert("All fields are required for the Customer table.");
            return;
        }
        columns = "FirstName, LastName, Email, Phone, Address";
        values = `'${customerFirstName}', '${customerLastname}', '${email}', '${phone}', '${address}'`;
        const insertQuery = `INSERT INTO \`${TableName}\` (${columns}) VALUES (${values});`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeInsert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: insertQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error inserting data.";
        }
    }
}


insertTest3Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'Product';
        let columns, values;
        const productName = prompt("Enter Product Name:");
        const description = prompt("Enter Description:");
        const price = prompt("Enter Price:");
        const createdAt = prompt("Enter Time of Creation:");
        if (!productName || !description || !price || !createdAt) {
            alert("All fields are required for the Product table.");
            return;
        }
        columns = "ProductName, Description, Price, CreatedAt";
        values = `'${productName}', '${description}', '${price}', '${createdAt}'`;
        const insertQuery = `INSERT INTO \`${TableName}\` (${columns}) VALUES (${values});`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeInsert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: insertQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error inserting data.";
        }
    }
}

insertTest4Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'ProductInventory';
        let columns, values;
        const productID = prompt("Enter Product ID:");
        const quantity = prompt("Enter Quantity:");
        const lastUpdated = prompt("Enter Latest Date of Update:");
        if (!productID || !quantity || !lastUpdated) {
            alert("All fields are required for the Product Inventory table.");
            return;
        }
        columns = "ProductID, Quantity, LastUpdated";
        values = `'${productID}', '${quantity}', '${lastUpdated}'`;
        const insertQuery = `INSERT INTO \`${TableName}\` (${columns}) VALUES (${values});`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeInsert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: insertQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error inserting data.";
        }
    }
}

insertTest6Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'OrderDetails';
        let columns, values;
        const productName = prompt("Enter Product Name:");
        const description = prompt("Enter Description:");
        const price = prompt("Enter Price:");
        const createdAt = prompt("Enter Time of Creation:");
        if (!productName || !description || !price || !createdAt) {
            alert("All fields are required for the Order Details table.");
            return;
        }
        columns = "ProductName, Description, Price, CreatedAt";
        values = `'${productName}', '${description}', '${price}', '${createdAt}'`;
        const insertQuery = `INSERT INTO \`${TableName}\` (${columns}) VALUES (${values});`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeInsert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: insertQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error inserting data.";
        }
    }
}

deleteTest2Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'Customer';
        let columns, values;
        columns = prompt("Enter the column:");
        values = prompt("Enter the value (With ' ' for String):");
        if (!columns || !values) {
            alert("All fields are required for the Customer table.");
            return;
        }
        const deleteQuery = `DELETE FROM \`${TableName}\` WHERE ${columns} = ${values};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeDelete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: deleteQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error deleting data.";
        }
    }
}

deleteTest3Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'Product'
        let columns, values;
        columns = prompt("Enter the column:");
        values = prompt("Enter the value (With ' ' for String):");
        if (!columns || !values) {
            alert("All fields are required for the Product table.");
            return;
        }
        const deleteQuery = `DELETE FROM \`${TableName}\` WHERE ${columns} = ${values};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeDelete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: deleteQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error deleting data.";
        }
    }
}

deleteTest4Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'ProductInventory';
        let columns, values;
        columns = prompt("Enter the column:");
        values = prompt("Enter the value (With ' ' for String):");
        if (!columns || !values) {
            alert("All fields are required for the Product Inventory table.");
            return;
        }
        const deleteQuery = `DELETE FROM \`${TableName}\` WHERE ${columns} = ${values};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeDelete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: deleteQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error deleting data.";
        }
    }
}

deleteTest6Btn.onclick = async function(){
    globalUsername = sessionStorage.getItem('username');
    if(globalUsername != 'Abu' && globalUsername != 'Boss'){
        window.alert("Permission rejected");
    }else{
        TableName = 'OrderDetails';
        let columns, values;
        columns = prompt("Enter the column:");
        values = prompt("Enter the value (With ' ' for String):");
        if (!columns || !values) {
            alert("All fields are required for the Order Details table.");
            return;
        }
        const deleteQuery = `DELETE FROM \`${TableName}\` WHERE ${columns} = ${values};`;
        try {
            const response = await fetch('http://54.161.89.255:3000/executeDelete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: deleteQuery }),
            });
    
            const result = await response.json();
            console.log("Insert Response:", result);
            document.getElementById('resultQuery').textContent = result.message;
        } catch (error) {
            console.error("Error inserting data:", error);
            document.getElementById('resultQuery').textContent = "Error deleting data.";
        }
    }
}

logoutBtn.onclick = async function() {
    try {
        // Optionally, inform the backend about the logout (e.g., to destroy the session)
        const response = await fetch('http://54.161.89.255:3000/api/logout', {
            method: 'POST',  // Logout endpoint
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // Handle backend response (optional)
        if (response.ok) {
            console.log("Logged out on the server.");
        } else {
            console.warn("Server logout failed:", await response.text());
        }

        // Redirect the user to the login page
        window.alert("Succesfully logged out");
        window.location.href = "index.html";
    } catch (error) {
        console.error('Error during logout:', error);
        window.alert("An error occurred while logging out. Please try again.");
    }
}

// to display which table is it going to query
document.querySelectorAll('button[id^="update"]').forEach(button => {
    button.addEventListener('click', function() {
        const tableName = this.getAttribute('data-table'); // Get table name from button's data-table attribute

        // Update the label text dynamically with the table name
        const label = document.getElementById('alterQueryLabel');
        label.textContent = `Enter ALTER TABLE Query for \`${tableName}\`:`;

        // Optionally, store the table name in a variable to use when executing the query
        // This can be used when constructing the query
        window.selectedTable = tableName;
    });
});

document.getElementById('executeQueryBtn').onclick = async function() {
    const alterQuery = document.getElementById('alterQuery').value.trim();
    const tableName = window.selectedTable;

    if (!alterQuery || !tableName) {
        alert('Please enter a valid ALTER TABLE query.');
        return;
    }
    // Validate that the query starts with ALTER TABLE (to prevent other dangerous commands)
    if (alterQuery.toUpperCase().startsWith('ALTER TABLE')) {
        alterQuery = alterQuery.slice(11).trim();
    }
    // Ensure that the query is not empty after removing ALTER TABLE
    if (alterQuery.length === 0) {
        alert('Query is invalid after removing "ALTER TABLE".');
        return;
    }

    // Construct the full query
    const fullQuery = `ALTER TABLE \`${tableName}\` ${alterQuery};`;

    try {
        const response = await fetch('http://54.161.89.255:3000/executeAlter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: fullQuery })
        });

                // Log the response for debugging
                const responseBody = await response.text();
                console.log('Response from server:', responseBody);


        const result = JSON.parse(responseBody);
        document.getElementById('resultQuery').textContent = result.message;
    } catch (error) {
        console.error('Error executing query:', error);
        document.getElementById('resultQuery').textContent = 'Error executing query.';
    }
};


