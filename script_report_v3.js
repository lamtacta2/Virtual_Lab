function readFom() {
  Velocity = parseFloat(document.getElementById("velocity").value);
  Laser_input_energy = parseFloat(document.getElementById("lie").value);
  Ambient_temperature = parseFloat(document.getElementById("at").value);
  Substrate_preheating_temperature = parseFloat(document.getElementById("spt").value);
}

firebase
.database()
.ref("Input")
.update({
  Velocity: 1,
  Laser_input_energy: 0.97,
  Ambient_temperature: 485,
  Substrate_preheating_temperature: 556,
  Control: 0,
  control_unity: 0,
  Plot: 0,
});

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
    .ref("Input")
    .on("value", function (snap) {

         ( async() => {
          
            let p = snap.val().Laser_input_energy;  
            let T_s = snap.val().Ambient_temperature;
            let T_c = snap.val().Substrate_preheating_temperature;
  
            T_s = 284 + (T_s-284-(T_s-284)%4);
            T_c = 555 + (T_c-555-(T_c-555)%4);
  
            if (p>= 1){
              T_s = 285 + (T_s-285-(T_s-285)%4);
              T_c = 556 + (T_c-556-(T_c-556)%4);
            } else{
              T_s = 284 + (T_s-284-(T_s-284)%4);
              T_c = 555 + (T_c-555-(T_c-555)%4);
    
              if(T_c >= 559){
                T_c = 559
              }
              if(T_c <= 587){
                T_c = 587
              }
    
              if(T_s <= 288){
                T_s = 288
              }
              if(T_s >= 308){
                T_s = 308
              }
            }
            
            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
            const data5 = [];
            const data6 = [];
            const data7 = [];
            const data8 = [];
            const data9 = [];
            const data10 = [];
            const labelsa = [];
            const labelsb = [];
  
            let k=2;
          
            let url1 = 'https://raw.githubusercontent.com/anh231000/Data/main/data1' + p.toString() + T_s.toString() + T_c.toString();
            let url2 = 'https://raw.githubusercontent.com/anh231000/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
            let url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
            let workbook2 = XLSX.read(await (await fetch(url2)).arrayBuffer());
            let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
  
            data10[0] = workbook3.Sheets.Sheet1["A2"].v;
            data10[1] = workbook3.Sheets.Sheet1["B2"].v;
            data10[2] = workbook3.Sheets.Sheet1["C2"].v;
            data10[3] = workbook3.Sheets.Sheet1["D2"].v;
  
            // var layoutx6 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>2</sub> with cooling rate = " + data10[0].toString().slice(0,7) +"(K/s)"};
            // var layoutx7 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>3</sub> with cooling rate = " + data10[1].toString().slice(0,7) +"(K/s)"};
            // var layoutx8 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>4</sub> with cooling rate = " + data10[2].toString().slice(0,7) +"(K/s)"};
            // var layoutx9 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>5</sub> with cooling rate = " + data10[3].toString().slice(0,7) +"(K/s)"};
  
            for(let i = 1; i < 1978; i++){
                const locale1 = "A"+i;
                const locale2 = "B"+i;
                const locale3 = "C"+i;
                const locale4 = "D"+i;
                const locale5 = "E"+i;
                const locale6 = "F"+i;
                const locale7 = "G"+i;
  
                data1[i-1] = workbook1.Sheets.Sheet1[locale1].v.slice(1,workbook1.Sheets.Sheet1[locale1].v.length-1);
                data2[i-1] = workbook1.Sheets.Sheet1[locale2].v.slice(1,workbook1.Sheets.Sheet1[locale2].v.length-1);
                data3[i-1] = workbook1.Sheets.Sheet1[locale3].v.slice(1,workbook1.Sheets.Sheet1[locale3].v.length-1);
                
                data4[i-1] = workbook2.Sheets.Sheet1[locale2].v;
                data5[i-1] = workbook2.Sheets.Sheet1[locale3].v;
                data6[i-1] = workbook2.Sheets.Sheet1[locale4].v;
                data7[i-1] = workbook2.Sheets.Sheet1[locale5].v;
                data8[i-1] = workbook2.Sheets.Sheet1[locale6].v;
                data9[i-1] = workbook2.Sheets.Sheet1[locale7].v;
                
                labelsa[i-1] = i-1;   
                labelsb[i-1] = workbook2.Sheets.Sheet1[locale1].v.slice(1,workbook2.Sheets.Sheet1[locale1].v.length-1);  
            }

            var layoutx1 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool witdh M<sub>w</sub> [mm]"}, title: "(a) M<sub>w</sub>"};
            var layoutx3 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool area M<sub>a</sub> [mm<sup>2</sup>]"}, title: "(b) M<sub>a</sub>"};
            var layoutx2 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool depth M<sub>d</sub> [mm]"}, title: "(c) M<sub>d</sub>"};
            
            var layoutx4 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
            var layoutx5 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
            var layoutx6 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
            var layoutx7 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
            var layoutx8 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
            var layoutx9 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
              
            // Define Data
            var datax1 = [{x: labelsa, y: data1, mode:"lines"}];
            var datax2 = [{x: labelsa, y: data2, mode:"lines"}];
            var datax3 = [{x: labelsa, y: data3, mode:"lines"}];
  
            var datax4 = [{x: labelsb, y: data4, mode:"lines"}];
            var datax5 = [{x: labelsb, y: data4, mode:"lines"}];
            var datax6 = [{x: labelsb, y: data4, mode:"lines"}];
            var datax7 = [{x: labelsb, y: data4, mode:"lines"}];
            var datax8 = [{x: labelsb, y: data4, mode:"lines"}];
            var datax9 = [{x: labelsb, y: data4, mode:"lines"}];
     
  
            Plotly.newPlot("myPlot3", datax4, layoutx4);
            Plotly.newPlot("myPlot4", datax5, layoutx5);
            Plotly.newPlot("myPlot5", datax6, layoutx6);
            Plotly.newPlot("myPlot6", datax7, layoutx7);
            Plotly.newPlot("myPlot7", datax8, layoutx8);
            Plotly.newPlot("myPlot8", datax9, layoutx9);

            Plotly.newPlot("myPlot9", datax1, layoutx1);
            Plotly.newPlot("myPlot10", datax2, layoutx2);
            Plotly.newPlot("myPlot11", datax3, layoutx3);
  
     })();
});

