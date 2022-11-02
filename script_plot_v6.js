var Velocity, Laser_input_energy, Ambient_temperature, Substrate_preheating_temperature;
var x, y, z;


var input_x = document.getElementById("input_x");
var input_x1 = document.getElementById("input_x1");
var input_y = document.getElementById("input_y");
var input_y1 = document.getElementById("input_y1");
var input_z = document.getElementById("input_z");
var input_z1 = document.getElementById("input_z1");

input_x1.value = input_x.value*10;
input_y1.value = input_y.value*10;
input_z1.value = input_z.value*10;


input_x.oninput = function() {
  input_x1.value = this.value*10;
}

input_x1.oninput = function() {
  input_x.value = this.value/10;
}

input_y.oninput = function() {
  input_y1.value = this.value*10;
}

input_y1.oninput = function() {
  input_y.value = this.value/10;
}

input_z.oninput = function() {
  input_z1.value = this.value*10;
}

input_z1.oninput = function() {
  input_z.value = this.value/10;
}


var v = document.getElementById("velocity");
var vr = document.getElementById("velocityr");

vr.value = v.value;

v.oninput = function() {
  vr.value = this.value;
}

vr.oninput = function() {
  v.value = this.value;
}

var p = document.getElementById("lie");
var pr = document.getElementById("lier");
pr.value = p.value;

p.oninput = function() {
  pr.value = this.value*100;
}

pr.oninput = function() {
  p.value = this.value/100;
}

var at = document.getElementById("at");
var atr = document.getElementById("atr");
vr.value = v.value;

at.oninput = function() {
  atr.value = this.value;
}

atr.oninput = function() {
  at.value = this.value;
}

var spt = document.getElementById("spt");
var sptr = document.getElementById("sptr");
sptr.value = spt.value;

spt.oninput = function() {
  sptr.value = this.value;
}

sptr.oninput = function() {
  spt.value = this.value;
}

var layoutx1 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool witdh M<sub>w</sub> [mm]"}, title: "(a) M<sub>w</sub>"};
var layoutx3 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool area M<sub>a</sub> [mm<sup>2</sup>]"}, title: "(c) M<sub>a</sub>"};
var layoutx2 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool depth M<sub>d</sub> [mm]"}, title: "(b) M<sub>d</sub>"};

var layoutx4 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clab N"};
var layoutx5 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>2</sub>"};
var layoutx6 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
var layoutx7 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
var layoutx8 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
var layoutx9 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}};
  
Plotly.newPlot("myPlot3",layoutx4);
Plotly.newPlot("myPlot4",layoutx5);
Plotly.newPlot("myPlot5",layoutx6);
Plotly.newPlot("myPlot6",layoutx7);
Plotly.newPlot("myPlot7",layoutx8);
Plotly.newPlot("myPlot8",layoutx9);
Plotly.newPlot("myPlot9",layoutx1);
Plotly.newPlot("myPlot10",layoutx2);
Plotly.newPlot("myPlot11",layoutx3);



function readFom() {
  Velocity = parseFloat(document.getElementById("velocity").value);
  Laser_input_energy = parseFloat(document.getElementById("lie").value);
  Ambient_temperature = parseFloat(document.getElementById("at").value);
  Substrate_preheating_temperature = parseFloat(document.getElementById("spt").value);
  x =  parseFloat(document.getElementById("input_x").value);
  y =  parseFloat(document.getElementById("input_y").value);
  z =  parseFloat(document.getElementById("input_z").value);
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
  x: 0,
  y: 0,
  z: 0,
});

document.getElementById("Reset").onclick = function () {
  readFom();
  document.getElementById("velocity").value = 1;
  document.getElementById("lie").value = 0.97;
  document.getElementById("at").value = 284;
  document.getElementById("spt").value = 555;
  document.getElementById("input_x").value = 0.1;
  document.getElementById("input_x").value = 0.1;
  document.getElementById("input_z").value = 0,1;
  firebase
    .database()
    .ref("Input")
    .update({
      Velocity: Velocity,
      Laser_input_energy: Laser_input_energy,
      Ambient_temperature: Ambient_temperature,
      Substrate_preheating_temperature: Substrate_preheating_temperature,
      Control: 0,
      control_unity: 0,
      Plot: 0,
      x: 0,
      y: 0,
      z: 0,
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
        
        (async() => {

          let p =  document.getElementById("lie").value;
          let T_s =  document.getElementById("at").value;
          let T_c =  document.getElementById("spt").value;

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

          var layoutx6 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>2</sub> with cooling rate = " + data10[0].toString().slice(0,7) +"(K/s)"};
          var layoutx7 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>3</sub> with cooling rate = " + data10[1].toString().slice(0,7) +"(K/s)"};
          var layoutx8 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>4</sub> with cooling rate = " + data10[2].toString().slice(0,7) +"(K/s)"};
          var layoutx9 = {xaxis: {title: "t (s)"}, yaxis: {title: "T (K)"}, title: "Clad P<sub>5</sub> with cooling rate = " + data10[3].toString().slice(0,7) +"(K/s)"};

         function data_update(k){
          for(let i = 2; i < k; i++){
              const locale1 = "A"+i;
              const locale2 = "B"+i;
              const locale3 = "C"+i;
              const locale4 = "D"+i;
              const locale5 = "E"+i;
              const locale6 = "F"+i;
              const locale7 = "G"+i;

              data1[i-2] = workbook1.Sheets.Sheet1[locale1].v.slice(1,workbook1.Sheets.Sheet1[locale1].v.length-1);
              data2[i-2] = workbook1.Sheets.Sheet1[locale2].v.slice(1,workbook1.Sheets.Sheet1[locale2].v.length-1);
              data3[i-2] = workbook1.Sheets.Sheet1[locale3].v.slice(1,workbook1.Sheets.Sheet1[locale3].v.length-1);
              
              data4[i-2] = workbook2.Sheets.Sheet1[locale2].v;
              data5[i-2] = workbook2.Sheets.Sheet1[locale3].v;
              data6[i-2] = workbook2.Sheets.Sheet1[locale4].v;
              data7[i-2] = workbook2.Sheets.Sheet1[locale5].v;
              data8[i-2] = workbook2.Sheets.Sheet1[locale6].v;
              data9[i-2] = workbook2.Sheets.Sheet1[locale7].v;
              
              labelsa[i-2] = i-2;   
              labelsb[i-2] = workbook2.Sheets.Sheet1[locale1].v.slice(1,workbook2.Sheets.Sheet1[locale1].v.length-1);  
          }}

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
   
         function update(){
           if (k<1978){
            k = k+1
           }

           if (k < 1978){data_update(k);}

            Plotly.newPlot("myPlot3", datax4, layoutx4);
            Plotly.newPlot("myPlot4", datax5, layoutx5);
            Plotly.newPlot("myPlot5", datax6, layoutx6);
            Plotly.newPlot("myPlot6", datax7, layoutx7);
            Plotly.newPlot("myPlot7", datax8, layoutx8);
            Plotly.newPlot("myPlot8", datax9, layoutx9);

            Plotly.newPlot("myPlot9", datax1, layoutx1);
            Plotly.newPlot("myPlot10", datax2, layoutx2);
            Plotly.newPlot("myPlot11", datax3, layoutx3);

           requestAnimationFrame(update);
         }
        requestAnimationFrame(update);
   })();
}