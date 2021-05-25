
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
                        insertcanva(data);
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

//For HTML table

// function insertData(data){
//     var builddata=`<h1>Tables</h1><div class="tablecont"><table>`;
//     data.forEach(rows => {
//         rowdata="<tr>"
//         rows.forEach(column => {
//             val=parseInt(column)
//             if(!isNaN(val))
//             {
//                 rowdata+=`<td style="text-align:right">${column}</td>`
//             }
//             else{
//                 rowdata+=`<td>${column}</td>`
//             }
//         });
//         rowdata+="</tr>";
//         builddata+=rowdata;
//     });
//     builddata+="</table></div>";
//     $('.container').html(builddata);
// }

function fixCanvaSize(height){
    width=height[0].length;
    var h=0;
    var w=0;
    if((height.length*30)+10<16384){
        h=(height.length*30)+20;
    }
    else{
        h=16384-10;
    }
    if((width*100)+10<16384){
        w=(width*100)+10;
    }
    else{
        w=16384-90;
    }
    var canva=`<h1 align="center">Tables</h1><canvas name="canvas" id="myCanvas" width="${w}px" height="${h}px" style="background-color:aquamarine;margin: 0px auto;border-radius:15px"></canvas> `;
    $('.container').html(canva);
}

function insertcanva(data){
    $('#myCanvas').removeClass('hidden');
    fixCanvaSize(data);
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var j=10;
    var i=10;
    var lastwi=0;
    data.forEach(rows => {
        ctx.moveTo(10,j);
        ctx.lineTo((rows.length)*100,j);
        j+=30;
        i=10;
        lastwi=rows.length;
        rows.forEach(column => {
            ctx.moveTo(i,10);
            ctx.lineTo(i,j);
            
            val=parseInt(column)
            if(isNaN(val)){
                ctx.fillText(column,i+2,j-4);
            }
            else{
                var me=(92-column.length);
                if(column.length>2) me-=13;
                else if(column.length>1) me-=5; 
                ctx.fillText(column,i+me,j-4);
            }
            i+=100;
        });
    });
    //end column
    ctx.moveTo(i-10,10);
    ctx.lineTo(i-10,j);
    //end row
    ctx.moveTo(10,j);
    ctx.lineTo(lastwi*100,j);
    ctx.stroke();
}

function filenameChange(){
    var file = document.getElementById('csvFile').files[0];
    $("#filename").text(file.name);
}