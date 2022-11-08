var layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
var layout1 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};

Plotly.newPlot("myPlot",layout);
Plotly.newPlot("myPlot1",layout1);  

$(document).ready(function() {
	$.getJSON('https://jsonip.com?callback=?', function (data) {
      $('#ip-address').text(data.ip);
      firebase
      .database()
      .ref("ID")
      .update({ip: "123.123.132.132"})
      let id1 = data.ip.toString();
      id1 = "123.123.132.132";
      let id = id1.split('.');
      id = id[0];
firebase
.database()
.ref(data.ip)
.on("value", function (snap) {

  (async() => {

    console.log(snap.val().control);
        if (snap.val().control == 1){

            let p = snap.val().p;  
            let T_s =  snap.val().at;  
            let T_c =  snap.val().spt;  
            let chose =  snap.val().point;  
            let chose1 =  snap.val().melt;  

            if (p >= 1){
              T_s = 285 + (T_s-285-(T_s-285)%4);
              T_c = 556 + (T_c-556-(T_c-556)%4);
              if(T_s >= 309){
                T_s = 309;
              }
              if(T_s <= 285){
                T_s = 285;
              }
              if(T_c >= 588){
                T_c = 588;
              }
              if(T_c <= 556){
                T_c = 556;
              }
            } else{
              T_s = 284 + (T_s-284-(T_s-284)%4);
              T_c = 555 + (T_c-555-(T_c-555)%4);
              if(T_s >= 308){
                T_s = 308;
              }
              if(T_s <= 284){
                T_s = 284;
              }
              if(T_c >= 587){
                T_c = 587;
              }
              if(T_c <= 555){
                T_c = 555;
              }
            }

            
            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
            const data10 = [];
            const labelsa = [];
            const labelsb = [];
  
            let k=2;
          
            let url1 = "";
            let url2 = "";
            let url3 = "";
    
            if(p == 1){
              url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() +".0"+ T_s.toString() + T_c.toString();
              url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() +".0"+ T_s.toString() + T_c.toString();  
              url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            } else{
              url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
              url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
              url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
            }
            
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
            let workbook2 = XLSX.read(await (await fetch(url2)).arrayBuffer());
            let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
  
            data10[0] = workbook3.Sheets.Sheet1["A2"].v;
            data10[1] = workbook3.Sheets.Sheet1["B2"].v;
            data10[2] = workbook3.Sheets.Sheet1["C2"].v;
            data10[3] = workbook3.Sheets.Sheet1["D2"].v;
  
            // while(data10[0].toString() == "nan"){
            //   T_c = T_c + 4;
            //   if(p == 1){
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() +".0"+ T_s.toString() + T_c.toString();  
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //   } else{
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
            //   }
            //   let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
            //   data10[0] = workbook3.Sheets.Sheet1["A2"].v;
            // }
            // while(data10[1].toString() == "nan"){
            //   T_c = T_c + 4;
            //   if(p == 1){
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() +".0"+ T_s.toString() + T_c.toString();  
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //   } else{
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
            //   }
            //   let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
            //   data10[1] = workbook3.Sheets.Sheet1["B2"].v;
            // }

            // while(data10[2].toString() == "nan"){
            //   T_c = T_c + 4;
            //   if(p == 1){
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() +".0"+ T_s.toString() + T_c.toString();  
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //   } else{
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
            //   }
            //   let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
            //   data10[2] = workbook3.Sheets.Sheet1["C2"].v;
            // }
            // while(data10[3].toString() == "nan"){
            //   T_c = T_c + 4;
            //   if(p == 1){
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() +".0"+ T_s.toString() + T_c.toString();  
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() +".0"+ T_s.toString() + T_c.toString();
            //   } else{
            //     url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
            //     url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
            //     url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
            //   }
            //   let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
            //   data10[3] = workbook3.Sheets.Sheet1["D2"].v;
            // }
  
           function data_update(k){
            for(let i = 2; i < k; i++){
                const locale1 = "A"+i;
                const locale2 = "B"+i;
                const locale3 = "C"+i;
                const locale4 = "D"+i;
                const locale5 = "E"+i;
                const locale6 = "F"+i;
                const locale7 = "G"+i;
                let locale8 = "";
                let locale9 = "";

                if(chose == 0){
                  locale8 = "B" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
                } else if(chose == 1){
                  locale8 = "C" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 1"};
                } else if(chose == 2){
                   locale8 = "D" + i;
                   layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 2"};
                } else if(chose == 3){
                  locale8 = "E" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 3"};
                } else if(chose == 4){
                  locale8 = "D" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 4"};
                } else{
                  locale8 = "G" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 5"};
                }

                if(chose1 == 0){
                  locale9 = "A" + i;
                  layout1 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool witdh M<sub>w</sub> [mm]"}, title: "M<sub>w</sub>"};
                } else if(chose1 == 1){
                  locale9 = "B" + i;
                  layout1 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool depth M<sub>d</sub> [mm]"}, title: "M<sub>d</sub>"};
                } else {
                  locale9 = "C" + i;
                  layout1 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool area M<sub>a</sub> [mm<sup>2</sup>]"}, title: "M<sub>a</sub>"};
                }

                data1[i-2] = workbook1.Sheets.Sheet1[locale9].v.slice(1,workbook1.Sheets.Sheet1[locale9].v.length-1);
                
                data4[i-2] = workbook2.Sheets.Sheet1[locale8].v;
                
                labelsa[i-2] = i-2;   
                labelsb[i-2] = workbook2.Sheets.Sheet1[locale1].v.slice(1,workbook2.Sheets.Sheet1[locale1].v.length-1);  
            }}
  
            // Define Data
            var data = [{x: labelsb, y: data4, mode:"lines"}];
            var datax1 = [{x: labelsa, y: data1, mode:"lines"}];

           function update(){

            firebase
            .database()
            .ref(id)
            .on("value", function (snap) {
            
              if (snap.val().control == 1){
             if (k<1978){
              k = k+1;
             }
  
             if (k < 1978){data_update(k);}

             
             Plotly.newPlot("myPlot", data, layout);
             Plotly.newPlot("myPlot1", datax1, layout1);
           
             requestAnimationFrame(update);
           } else if(snap.val().control == 0){
            location.reload();
           }
          })}
          requestAnimationFrame(update);
          }
          console.log(id);
     })(); 
    }) 
});	});