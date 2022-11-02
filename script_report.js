firebase
    .database()
    .ref("Input/")
    .on("value", function (snap) {
        document.getElementById("v").innerHTML = snap.val().Velocity;
        document.getElementById("at").innerHTML = snap.val().Ambient_temperature;
        document.getElementById("lie").innerHTML = snap.val().Laser_input_energy;  
        document.getElementById("spt").innerHTML = snap.val().Substrate_preheating_temperature;
    //   console.log(snap.val().Velocity);
    });

    firebase
    .database()
    .ref("Output/")
    .on("value", function (snap) {
        document.getElementById("ot").innerHTML = snap.val().Output;
    //   console.log(snap.val().Velocity);
    });

    (
        async() => {
  
            const data1 = [];
            const data2 = [];
            const data3 = [];
            const labelsa = [];
  
            const data4 = [];
            const data5 = [];
            const data6 = [];
            const labelsb = [];
  
            let k=2;
            
            let workbook = XLSX.read(await (await fetch("./data.csv")).arrayBuffer());
            console.log(workbook);
            const name = [workbook.Sheets.Sheet1.A1.v, workbook.Sheets.Sheet1.B1.v, workbook.Sheets.Sheet1.C1.v];
            console.log(name);
  
            for(let i = 1; i < 1978; i++){
  
              const locale4 = "A"+i;
              const locale5 = "B"+i;
              const locale6 = "C"+i;
  
              data4[i-1] = workbook.Sheets.Sheet1[locale4].v.slice(1,workbook.Sheets.Sheet1[locale4].v.length-1);
              data5[i-1] = workbook.Sheets.Sheet1[locale5].v.slice(1,workbook.Sheets.Sheet1[locale5].v.length-1);
              data6[i-1] = workbook.Sheets.Sheet1[locale6].v.slice(1,workbook.Sheets.Sheet1[locale6].v.length-1);
  
              labelsb[i] = i;
          }
  
          // Define Data
          var datax = [
            {x: labelsb, y: data4, mode:"lines", name: name[0]},
            {x: labelsb, y: data5, mode:"lines", name: name[1]},
            {x: labelsb, y: data6, mode:"lines", name: name[2]}
          ];
  
          //Define Layout
          var layoutx = {title: "Melt Prediction"};
  
          // Display using Plotly
          Plotly.newPlot("myPlot", datax, layoutx);
     })();
  
(
        async() => {
  
            const data1 = [];
            const data2 = [];
  
            const data4 = [];
            const data5 = [];
  
            let k=2;
            
            let workbook = XLSX.read(await (await fetch("./data1.csv")).arrayBuffer());
  
            for(let i = 1; i < 1978; i++){
  
              const locale4 = "A"+i;
              const locale5 = "B"+i;
  
              data4[i-1] = workbook.Sheets.Sheet1[locale4].v.slice(1,workbook.Sheets.Sheet1[locale4].v.length-1);
              data5[i-1] = workbook.Sheets.Sheet1[locale5].v;
          }
  
          // Define Data
          var datax = [
            {x: data4, y: data5, mode:"lines", name: "PP"}
          ];
  
          //Define Layout
          var layoutx = {title: "Point Prediction"};
  
          // Display using Plotly
          Plotly.newPlot("myPlot1", datax, layoutx);
     })();

