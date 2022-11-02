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
        if (snap.val().Plot == 1){
          (
            async() => {


              let p = snap.val().Laser_input_energy;  
              let T_s = snap.val().Ambient_temperature;
              let T_c = snap.val().Substrate_preheating_temperature;

              T_s = 200 + (T_s-200-(T_s-200)%10);
              T_c = 500 + (T_c-500-(T_c-500)%10);
  
                const data4 = [];
                const data5 = [];
                const data6 = [];
                const labelsb = [];

                let url = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data' + p.toString() + T_s.toString() + T_c.toString();
                let workbook = XLSX.read(await (await fetch(url)).arrayBuffer());

                let url1 = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
                let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
                document.getElementById("ot").innerHTML = workbook1.Sheets.Sheet1["A2"].v

                // let workbook = XLSX.read(await (await fetch("./data.csv")).arrayBuffer());
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
                {x: labelsb, y: data5, mode:"lines", name: name[1]}
              ];

              var datax1 = [
                {x: labelsb, y: data6, mode:"lines", name: name[2]}
              ];
      
              //Define Layout
              var layoutx = { xaxis: {title: "Time (s)"}, yaxis: {title: "mm"}, title: "Melt Width & Melt Depth Prediction"};
              var layouty = { xaxis: {title: "Time (s)"}, yaxis: {title: "mm<sup>2</sup>"}, title: "Melt Area Prediction"};
      
      
              // Display using Plotly
              Plotly.newPlot("myPlot", datax, layoutx);
              Plotly.newPlot("myPlot1", datax1, layouty);
         })();
        }

        if (snap.val().Plot == 2){
          (
            async() => {
              let p = snap.val().Laser_input_energy;  
              let T_s = snap.val().Ambient_temperature;
              let T_c = snap.val().Substrate_preheating_temperature;

              T_s = 200 + (T_s-200-(T_s-200)%10);
              T_c = 500 + (T_c-500-(T_c-500)%10);
  
              const data4 = [];
              const data5 = [];

              let url = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
              let workbook = XLSX.read(await (await fetch(url)).arrayBuffer());

              let url1 = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
              let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
              document.getElementById("ot").innerHTML = workbook1.Sheets.Sheet1["A2"].v
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
              Plotly.newPlot("myPlot", datax, layoutx);
         })();
  }
});



//     (
//         async() => {
  
//             const data1 = [];
//             const data2 = [];
//             const data3 = [];
//             const labelsa = [];
  
//             const data4 = [];
//             const data5 = [];
//             const data6 = [];
//             const labelsb = [];
  
//             let k=2;
            
//             let workbook = XLSX.read(await (await fetch("./data.csv")).arrayBuffer());
//             console.log(workbook);
//             const name = [workbook.Sheets.Sheet1.A1.v, workbook.Sheets.Sheet1.B1.v, workbook.Sheets.Sheet1.C1.v];
//             console.log(name);
  
//             for(let i = 1; i < 1978; i++){
  
//               const locale4 = "A"+i;
//               const locale5 = "B"+i;
//               const locale6 = "C"+i;
  
//               data4[i-1] = workbook.Sheets.Sheet1[locale4].v.slice(1,workbook.Sheets.Sheet1[locale4].v.length-1);
//               data5[i-1] = workbook.Sheets.Sheet1[locale5].v.slice(1,workbook.Sheets.Sheet1[locale5].v.length-1);
//               data6[i-1] = workbook.Sheets.Sheet1[locale6].v.slice(1,workbook.Sheets.Sheet1[locale6].v.length-1);
  
//               labelsb[i] = i;
//           }
  
//           // Define Data
//           var datax = [
//             {x: labelsb, y: data4, mode:"lines", name: name[0]},
//             {x: labelsb, y: data5, mode:"lines", name: name[1]},
//             {x: labelsb, y: data6, mode:"lines", name: name[2]}
//           ];
  
//           //Define Layout
//           var layoutx = {title: "Melt Prediction"};
  
//           // Display using Plotly
//           Plotly.newPlot("myPlot", datax, layoutx);
//      })();
  
// (
//         async() => {
  
//             const data1 = [];
//             const data2 = [];
  
//             const data4 = [];
//             const data5 = [];
  
//             let k=2;
            
//             let workbook = XLSX.read(await (await fetch("./data1.csv")).arrayBuffer());
  
//             for(let i = 1; i < 1978; i++){
  
//               const locale4 = "A"+i;
//               const locale5 = "B"+i;
  
//               data4[i-1] = workbook.Sheets.Sheet1[locale4].v.slice(1,workbook.Sheets.Sheet1[locale4].v.length-1);
//               data5[i-1] = workbook.Sheets.Sheet1[locale5].v;
//           }
  
//           // Define Data
//           var datax = [
//             {x: data4, y: data5, mode:"lines", name: "PP"}
//           ];
  
//           //Define Layout
//           var layoutx = {title: "Point Prediction"};
  
//           // Display using Plotly
//           Plotly.newPlot("myPlot1", datax, layoutx);
//      })();
