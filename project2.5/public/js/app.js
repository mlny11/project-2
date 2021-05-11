$(document).ready(function () {

    var amount = $("#amount");
    var creditDebit = $("#creditDebit");
    var category = $("#category");
    var submit = $("#submit");
    var notes = $("#notes")

//  gets all transactions in db

    function getTransactions() {
        $.get("/api/transactions", function (data) {
            transactions = data;
            if (!transactions || !transactions.length) {
                displayEmpty()
            }
            else {
                initializeRows(data);
            }
        });
    }

// gets credit only submitions from db

    function getCreditTransactions() {
        $.get("/api/credits", function (data) {
            if (!data.count || !data.rows.length) {
                displayCreditEmpty()
            }
            else {
                initializeCreditRows(data);
            }
        });
    }

// gets debit only submitions from db

    function getDebitTransactions() {
        $.get("/api/debits", function (data) {
            if (!data.count || !data.rows.length) {
                displayDebitEmpty()
            }
            else {
                initializeDebitRows(data);
            }
        });
    }

// gets total submitions from db

    function getTotal() {
        $.get("/api/totalamount", function (total) {
            $("#currentBalance").html(`<p class="total ${total < 0 ? "red" : ""}">$${total}</p>`)
        });
    }

    


// submits user input only if all fields have been entered

    $(submit).on("click", function () {
        event.preventDefault();
        if (creditDebit.val() === "Deposit") {
            var boolean = 1
        }
        else {
            var boolean = 0
        }

        if (!amount.val().trim() || !creditDebit.val() || !category.val() || !notes.val().trim()) {
            return;
        }
        if (boolean === 1) {
            var newTransaction = {
                transAmount: Math.abs(amount.val().trim()),
                credit: boolean,
                category: category.val(),
                notes: notes.val().trim(),
            };

        }
        else {
            var newTransaction = {
                transAmount: -Math.abs(amount.val().trim()),
                credit: boolean,
                category: category.val(),
                notes: notes.val().trim(),
            };
        }
        submitTransaction(newTransaction);
    });

// pushs user data into db as well as pulling and hiding transaction table



    function submitTransaction(Transaction) {
        $.post("/api/transactions", Transaction, function () {
            window.location.href = "/";
        })
    }


    function hideAll() {
        $("#transaction").hide();
        $("#table").hide();
        $("#welcomeMessage").hide();
        $("#creditTable").hide();
        $("#debitTable").hide();
    }


    $("#transactionHistory").on("click", function () {
        hideAll();
        $("#table").show();
    })


    $("#newTransaction").on("click", function () {
        hideAll();
        $("#transaction").show()
    })


    $("#income").on("click", function () {
        hideAll();
        $("#creditTable").show();
    })


    $("#expenses").on("click", function () {
        hideAll()
        $("#debitTable").show();
    })


    function displayEmpty() {
        $("#transTable").html(`<h2>You have no transaction history</h2>`)
    }

    function displayCreditEmpty() {
        $("#creditTable").html(`<h2>You have no transaction history</h2>`)
    }


    function displayDebitEmpty() {
        $("#creditTable").html(`<h2>You have no transaction history</h2>`)
    }


    function pageLoadMessage() {
        $("#welcomeMessage").show();
    }
    

    function initializeRows(transactions) {
        for (var i = 0; i < transactions.length; i++) {

            if (transactions[i].credit == 1) {
                var credit = "Deposit"
            }
            else {
                var credit = "Withdrawal"
            }
            $("#tableBody").prepend(`
            <tr>
                <td>$${transactions[i].transAmount}</td>
                <td>${credit}</td>
                <td>${transactions[i].category}</td>
                <td>${moment(transactions[i].createdAt).format("LLL")}</td>
                <td>${transactions[i].notes}</td>
            </tr>
           `)
        }


    }

    function getCreditTotal() {
        $.get("/api/totalcredit", function (total) {
            $("#creditTableBody").append(`
            <tr>
                <td><strong>$${total.toFixed(2)}</strong></td>
            </tr>
            `)
        });
    }

    function getDebitTotal() {
        $.get("/api/totalDebit", function (total) {
            $("#debitTableBody").append(`
            <tr>
                <td><strong>$${total.toFixed(2)}</strong></td>
            </tr>
            `)
        });
    }
// posts to table 
    function initializeCreditRows(transactions) {
        for (var i = 0; i < transactions.rows.length; i++) {

            $("#creditTableBody").prepend(`
            <tr>
                <td>$${transactions.rows[i].transAmount}</td>
                <td>${transactions.rows[i].category}</td>
                <td>${moment(transactions.rows[i].createdAt).format("LLL")}</td>
                <td>${transactions.rows[i].notes}</td>
            </tr>
           `)
        }
        getCreditTotal();
    }

    function initializeDebitRows(transactions) {
        for (var i = 0; i < transactions.rows.length; i++) {

            $("#debitTableBody").prepend(`
            <tr>
                <td>$${(Math.abs(transactions.rows[i].transAmount)).toFixed(2)}</td>
                <td>${transactions.rows[i].category}</td>
                <td>${moment(transactions.rows[i].createdAt).format("LLL")}</td>
                <td>${transactions.rows[i].notes}</td>
            </tr>
           `)
        }
        getDebitTotal();
    }

    // home button to scroll page to bottom where input is 
    var $elem = $('#body');
function scrollToBottom(){
    $('#home').click(
		function () {
            $('html, body').animate({scrollTop: $elem.height()}, 800);
            console.log("test");
		}
    )
    };
    // runs all functions on page load
    scrollToBottom();
    getTotal();
    getTransactions();
    getCreditTransactions();
    getDebitTransactions();
    hideAll();
    pageLoadMessage();

});