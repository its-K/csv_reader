
function uploadFile(){
    var file = document.getElementById('csvFile').files[0];
    var filename=file.type;
    if(filename==="text/csv"){
        if(file.size<3000000){
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
                        insertData(data);
                        console.log(data);
                    }
                    $("#error").html('CSV file is empty');
                });
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            $("#error").html('Please select a file size less than 3Mb');
        }
    }
    else{
        $("#error").html('Please select a CSV file !');
    }
}

function insertData(data){
    var builddata=`<h1>Tables</h1><div class="tablecont"><table>`;
    data.forEach(rows => {
        rowdata="<tr>"
        rows.forEach(column => {
            val=parseInt(column)
            if(!isNaN(val))
            {
                rowdata+=`<td style="text-align:right">${column}</td>`
            }
            else{
                rowdata+=`<td>${column}</td>`
            }
        });
        rowdata+="</tr>";
        builddata+=rowdata;
    });
    builddata+="</table></div>";
    $('.container').html(builddata);
}

function filenameChange(){
    var file = document.getElementById('csvFile').files[0];
    $("#filename").text(file.name);
}