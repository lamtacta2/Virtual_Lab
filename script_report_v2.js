firebase
    .database()
    .ref("Input/")
    .on("value", function (snap) {
        document.getElementById("v").innerHTML = snap.val().Velocity;
        document.getElementById("at").innerHTML = snap.val().Ambient_temperature;
        document.getElementById("lie").innerHTML = snap.val().Laser_input_energy;  
        document.getElementById("spt").innerHTML = snap.val().Substrate_preheating_temperature;
    });

    firebase
    .database()
    .ref("Output/")
    .on("value", function (snap) {
        document.getElementById("ot").innerHTML = snap.val().Output;
    });

    firebase
    .database()
    .ref("Input")
    .on("value", function (snap) {

         ( async() => {

              let p = snap.val().Laser_input_energy;  
              let T_s = snap.val().Ambient_temperature;
              let T_c = snap.val().Substrate_preheating_temperature;

              T_s = 200 + (T_s-200-(T_s-200)%10);
              T_c = 500 + (T_c-500-(T_c-500)%10);
  
              const data1 = [];
              const data2 = [];
              const data3 = [];
              const data4 = [];
              const data5 = [];
              const labelsa = [];
            
              let url = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data' + p.toString() + T_s.toString() + T_c.toString();
              console.log(url);
              let workbook = XLSX.read(await (await fetch(url)).arrayBuffer());
              let url1 = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
              let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
              let url2 = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
                let workbook2 = XLSX.read(await (await fetch(url2)).arrayBuffer());
            document.getElementById("ot").innerHTML = workbook2.Sheets.Sheet1["A2"].v
              const name = [workbook.Sheets.Sheet1.A1.v, workbook.Sheets.Sheet1.B1.v, workbook.Sheets.Sheet1.C1.v];

              for(let i = 1; i < 1978; i++){
                  const locale1 = "A"+i;
                  const locale2 = "B"+i;
                  const locale3 = "C"+i;
                  data1[i-1] = workbook.Sheets.Sheet1[locale1].v.slice(1,workbook.Sheets.Sheet1[locale1].v.length-1);
                  data2[i-1] = workbook.Sheets.Sheet1[locale2].v.slice(1,workbook.Sheets.Sheet1[locale2].v.length-1);
                  data3[i-1] = workbook.Sheets.Sheet1[locale3].v.slice(1,workbook.Sheets.Sheet1[locale3].v.length-1);
                  data4[i-1] = workbook1.Sheets.Sheet1[locale1].v.slice(1,workbook1.Sheets.Sheet1[locale1].v.length-1);
                  data5[i-1] = workbook1.Sheets.Sheet1[locale2].v;
                  labelsa[i-1] = i-1;   
              }
       
              // Define Data
              var datax = [{x: labelsa, y: data1, mode:"lines", name: name[0]}];
              var datax1 = [{x: labelsa, y: data2, mode:"lines", name: name[1]}];
              var datax2 = [{x: labelsa, y: data3, mode:"lines", name: name[2]}];
              var datax3 = [{x: data4, y: data5, mode:"lines", name: "Point Prediction"}];

              var layoutx = { xaxis: {title: "Time (s)"}, yaxis: {title: "mm"}, title: "Melt Width Prediction"};
              var layoutx2 = { xaxis: {title: "Time (s)"}, yaxis: {title: "mm<sup>2</sup>"}, title: "Melt Area Prediction"};
              var layoutx1 = { xaxis: {title: "Time (s)"}, yaxis: {title: "mm"}, title: "Melt Depth Prediction"};
              var layoutx3 = {xaxis: {title: "Time (s)"}, yaxis: {title: "Temperature (K)"}, title: "Point Prediction"};
                
              Plotly.newPlot("myPlot", datax, layoutx);
              Plotly.newPlot("myPlot1", datax1, layoutx1);
              Plotly.newPlot("myPlot2", datax2, layoutx2);
              Plotly.newPlot("myPlot3", datax3, layoutx3);

       })();
});

