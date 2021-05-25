
function uploadFile(){
    var url="/upload";
    var formData=new FormData();
    var file = document.getElementById('csvFile').files[0];
    formData.append('file',file);
    fetch(url, {
        method: 'POST',
        body: formData,
      }).then((response) => {
        response.text().then(function (text) {
            console.log(JSON.parse(text));
            $("#form").addClass("hidden");
            insertData(JSON.parse(text));
          });
      }).catch((error)=>{
          console.log(error);
      })
}

function insertData(data){
    var builddata="<table>";
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