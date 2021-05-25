
function uploadFile(){
    var file = document.getElementById('csvFile').files[0];
    var filename=file.type;
    if(filename==="text/csv"){
        var url="/upload";
        var formData=new FormData();
        formData.append('file',file);
        fetch(url, {
            method: 'POST',
            body: formData,
        }).then((response) => {
            response.text().then(function (text) {
                data=JSON.parse(text);
                if(data.length>=1){
                    $("#form").addClass("hidden");
                    insertData(JSON.parse(text));
                }
                $("#error").html('CSV file is empty');
            });
        }).catch((error)=>{
            console.log(error);
        })
    }
    else{
        $("#error").html('Please select a CSV file !');
    }
}

function insertData(data){
    var builddata="<h1>Tables</h1><table>";
    data.forEach(rows => {
        rowdata="<tr>"
        rows.forEach(column => {
            rowdata+=`<td>${column}</td>`
        });
        rowdata+="</tr>";
        builddata+=rowdata;
    });
    builddata+="</table>";
    $('.container').html(builddata);
}

function filenameChange(){
    var file = document.getElementById('csvFile').files[0];
    $("#filename").text(file.name);
}