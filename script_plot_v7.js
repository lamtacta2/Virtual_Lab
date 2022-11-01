var Velocity, Laser_input_energy, Ambient_temperature, Substrate_preheating_temperature;
var x, y, z, p;

var input_x = document.getElementById("input_x");
var input_y = document.getElementById("input_y");
var input_z = document.getElementById("input_z");

var layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
var layout1 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};

Plotly.newPlot("myPlot",layout);
Plotly.newPlot("myPlot1",layout1);

function readFom() {
    Velocity = parseFloat(document.getElementById("velocity").value);
    Laser_input_energy = parseFloat(document.getElementById("lie").value);
    Ambient_temperature = parseFloat(document.getElementById("at").value);
    Substrate_preheating_temperature = parseFloat(document.getElementById("spt").value);
    x =  parseFloat(document.getElementById("input_x").value);
    y =  parseFloat(document.getElementById("input_y").value);
    z =  parseFloat(document.getElementById("input_z").value);
    p =  document.getElementById("point").value;
  }
  
  firebase
  .database()
  .ref("Input")
  .update({
    Velocity: 1,
    Laser_input_energy: 0.97,
    Ambient_temperature: 285,
    Substrate_preheating_temperature: 556,
    Control: 0,
    control_unity: 0,
    Plot: 0,
    x: 1,
    y: 1,
    z: 1,
  });
  
  document.getElementById("Reset").onclick = function () {
    readFom();
    document.getElementById("velocity").value = 1;
    document.getElementById("lie").value = 0.97;
    document.getElementById("at").value = 285;
    document.getElementById("spt").value = 556;
    document.getElementById("input_x").value = 0.1;
    document.getElementById("input_x").value = 0.1;
    document.getElementById("input_z").value = 0,1;
    document.getElementById("input_z").value = "N";
    firebase
      .database()
      .ref("Input")
      .update({
        Velocity: Velocity,
        Laser_input_energy: 0.97,
        Ambient_temperature: 285,
        Substrate_preheating_temperature: 556,
        Control: 0,
        control_unity: 0,
        Plot: 0,
        x: 1,
        y: 1,
        z: 1,
        p: "N",
      });
    location.reload();
  }
  
  document.getElementById("Run").onclick = function All(){
    readFom();
    firebase
    .database()
    .ref("Input")
    .update({
    Velocity: Velocity,
    Laser_input_energy: Laser_input_energy,
    Ambient_temperature: Ambient_temperature,
    Substrate_preheating_temperature: Substrate_preheating_temperature,
    Control: 1,
    control_unity: 1,
    Plot: 1,
    x: x,
    y: y,
    z: z,
    });
  
      firebase
          .database()
          .ref("Input")
          .update({
          Velocity: Velocity,
          Laser_input_energy: Laser_input_energy,
          Ambient_temperature: Ambient_temperature,
          Substrate_preheating_temperature: Substrate_preheating_temperature,
          Control: 1,
          control_unity: 1,
          Plot: 1,
          x: x,
          y: y,
          z: z,
          });
          
        
          (async() => {

            let p =  document.getElementById("lie").value;
            let T_s =  document.getElementById("at").value;
            let T_c =  document.getElementById("spt").value;
            let chose =  document.getElementById("point").value;
            let chose1 =  document.getElementById("melt").value;
  
            if (p>= 1){
              T_s = 285 + (T_s-285-(T_s-285)%4);
              T_c = 556 + (T_c-556-(T_c-556)%4);
            } else{
              T_s = 284 + (T_s-284-(T_s-284)%4);
              T_c = 555 + (T_c-555-(T_c-555)%4);
            }
            
            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
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
  
            while(data10[0].toString() == "nan"){
              T_c = T_c + 4;
              let url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
              let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
              data10[0] = workbook3.Sheets.Sheet1["A2"].v;
            }
            while(data10[1].toString() == "nan"){
              T_c = T_c + 4;
              let url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
              let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
              data10[1] = workbook3.Sheets.Sheet1["B2"].v;
            }
            while(data10[2].toString() == "nan"){
              T_c = T_c + 4;
              let url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
              let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
              data10[2] = workbook3.Sheets.Sheet1["C2"].v;
            }
            while(data10[3].toString() == "nan"){
              T_c = T_c + 4;
              let url3 = 'https://raw.githubusercontent.com/anh231000/Data/main/data3' + p.toString() + T_s.toString() + T_c.toString();
              let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());
              data10[3] = workbook3.Sheets.Sheet1["D2"].v;
            }
  


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

                if(chose == "N"){
                  locale8 = "B" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
                } else if(chose == "1"){
                  locale8 = "C" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 1"};
                } else if(chose == "2"){
                   locale8 = "D" + i;
                   layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 2"};
                } else if(chose == "3"){
                  locale8 = "E" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 3"};
                } else if(chose == "4"){
                  locale8 = "D" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 4"};
                } else{
                  locale8 = "G" + i;
                  layout = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab 5"};
                }

                if(chose1 == "1"){
                  locale9 = "A" + i;
                  layout1 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool witdh M<sub>w</sub> [mm]"}, title: "M<sub>w</sub>"};
                } else if(chose1 == "2"){
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
             if (k<1978){
              k = k+1;
             }
  
             if (k < 1978){data_update(k);}
             Plotly.newPlot("myPlot", data, layout);
             Plotly.newPlot("myPlot1", datax1, layout1);

             requestAnimationFrame(update);
           }
          requestAnimationFrame(update);
     })();
  }