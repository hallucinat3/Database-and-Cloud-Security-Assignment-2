const loginBtn = document.getElementById("loginBtn");
const termsBtn = document.getElementById("termsBtn");
const myUsername = document.getElementById("myUsername");
const myPassword = document.getElementById("myPassword");
const username = sessionStorage.getItem("username");
const baseURL = 'http://ec2-54-161-89-255.compute-1.amazonaws.com:3000/';

let termsDisplayed = false;
   
loginBtn.onclick = async function(e) {
    e.preventDefault();
    const enteredUsername = myUsername.value;
    const enteredPassword = myPassword.value;

    try {
        //Send login credentials to the backend for validation
        const response = await fetch(baseURL + 'api/login', {
            method: 'POST',  // Sending data to the backend
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: enteredUsername, password: enteredPassword })
        });

        // Parse the response from the backend
        const data = await response.json();
        // const anotherData = await anotherResponse.json();

        if (data.success) {
            sessionStorage.setItem('username', enteredUsername);
            window.alert("Authentication successful");
            window.location.href = "mainpage.html";  // Redirect to main page
        } else {
            window.alert(data.message || "Incorrect login credentials");
            myUsername.value = '';
            myPassword.value = '';
        }

        // if (anotherData.success){
        //     console.log("Username sent to backend");
        // }else{
        //     console.log("Error: Username is not sent to backend");
        // }
    } catch (error) {
        console.error('Error during login:', error);
        window.alert("An error occurred. Please try again later.");
    }
};

termsBtn.onclick = async function(){
    console.log("button clicked");
    const output = document.getElementById("outputTermsBtn");

    if(termsDisplayed == true){
        output.textContent = '';
        termsDisplayed = false;
        return;
    }

    const termsAndConditions = `
                        Terms and Conditions
                        Effective Date: 1 January 2025

                        Welcome to the XYZ Company Warehouse Inventory Web Application. The Application is an internal tool 
                        intended solely for use by authorized employees of XYZ Company. 
                        By accessing or using the Application, you agree to be bound by the following terms and conditions. 
                        If you do not agree, you must not access or use the Application.

                        1. Authorized Use
                        1.1 The Application is restricted to employees of XYZ Company who have been granted explicit access 
                            by the Company.
                        1.2 Unauthorized access, including access by non-employees, is strictly prohibited and may result 
                            in disciplinary or legal action.
                        1.3 Users are responsible for maintaining the confidentiality of their login credentials and must 
                            not share them with others.

                        2. Purpose of Use
                        2.1 The Application is to be used exclusively for managing, viewing, and updating the inventory data 
                            of the Company's warehouse operations.
                        2.2 Any use of the Application for personal, non-work-related, or unlawful purposes is prohibited.

                        3. Data Confidentiality
                        3.1 All data accessed through the Application is confidential and the property of XYZ Company.
                        3.2 Users must not share, disclose, or distribute any information obtained through the Application 
                            to unauthorized parties.
                        3.3 Any breach of confidentiality may result in disciplinary action, including termination of 
                            employment and potential legal proceedings.

                        4. User Responsibilities
                        4.1 Users must ensure the accuracy of the data entered or modified within the Application.
                        4.2 Any unauthorized changes to data, deletion of records, or misuse of the Application's 
                            functionalities are strictly prohibited.
                        4.3 Users must report any technical issues, security breaches, or suspicious activity immediately 
                            to the IT department.

                        5. Monitoring and Logging
                        5.1 The Company reserves the right to monitor and log all activities within the Application 
                            for security and operational purposes.
                        5.2 By using the Application, you consent to such monitoring and logging.

                        6. Security
                        6.1 Users must adhere to the Companyâ€™s IT security policies while using the Application, 
                            including the use of strong passwords and secure networks.
                        6.2 The Company will take reasonable measures to secure the Application; however, it is the userâ€™s 
                            responsibility to ensure secure access from their device.

                        7. Access Termination
                        7.1 The Company reserves the right to revoke access to the Application at any time without notice, 
                            particularly in cases of policy violations or changes in employment status.
                        7.2 Upon termination of employment, access to the Application will be immediately revoked, and 
                            users must not attempt to log in or access Company data.

                        8. Limitation of Liability
                        8.1 The Company is not responsible for any damages or losses arising from the use or inability to
                             use the Application, including but not limited to data loss, system errors, or security breaches.
                        8.2 Users are solely responsible for any actions they perform within the Application.

                        9. Updates and Modifications
                        9.1 The Company reserves the right to update or modify these Terms at any time.
                        9.2 Users will be notified of any significant changes, and continued use of the Application 
                            after such changes constitutes acceptance of the updated Terms.

                        10. Governing Law
                        10.1 These Terms are governed by the laws of Malaysia.
                        10.2 Any disputes arising from the use of the Application shall be resolved in accordance with 
                            the laws of Malaysia.

                        11. Acknowledgment
                        By accessing and using the Application, you acknowledge that you have read, understood, and 
                            agreed to these Terms and Conditions.`
    try{
        console.log(termsAndConditions);
        output.innerText = termsAndConditions;
        termsDisplayed = true;

    }catch (error){
        console.log("Error displaying terms and conditions: " + error);
    }
};
  