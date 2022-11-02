var Velocity, Laser_input_energy, Ambient_temperature, Substrate_preheating_temperature;

Plotly.newPlot("myPlot");
Plotly.newPlot("myPlot1");


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
  pr.value = this.value;
}

pr.oninput = function() {
  p.value = this.value;
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


// document.getElementById("velocityr").onchange = function (){
//   document.getElementById("velocity").value = document.getElementById("velocityr").value;
// }

// document.getElementById("velocity").onchange = function (){
//   document.getElementById("velocityr").value = document.getElementById("velocity").value;
// }

// document.getElementById("lier").onchange = function (){
//   document.getElementById("lie").value = document.getElementById("lier").value;
// }

// document.getElementById("lie").onchange = function (){
//   document.getElementById("lier").value = document.getElementById("lie").value;
// }

// document.getElementById("sptr").onchange = function (){
//   document.getElementById("spt").value = document.getElementById("sptr").value;
// }

// document.getElementById("spt").onchange = function (){
//   document.getElementById("sptr").value = document.getElementById("spt").value;
// }

// document.getElementById("atr").onchange = function (){
//   document.getElementById("at").value = document.getElementById("atr").value;
// }

// document.getElementById("at").onchange = function (){
//   document.getElementById("atr").value = document.getElementById("at").value;
// }


function readFom() {
  Velocity = parseFloat(document.getElementById("velocity").value);
  Laser_input_energy = parseFloat(document.getElementById("lie").value);
  Ambient_temperature = parseFloat(document.getElementById("at").value);
  Substrate_preheating_temperature = parseFloat(document.getElementById("spt").value);
  // console.log(Velocity, Laser_input_energy, Ambient_temperature, Substrate_preheating_temperature);
}

firebase
.database()
.ref("Input")
.update({
  Velocity: 10,
  Laser_input_energy: 1,
  Ambient_temperature: 10,
  Substrate_preheating_temperature: 10,
  Control: 0,
  control_unity: 0,
  Plot: 0,
});

firebase
.database()
.ref("Output")
.update({
  Output: 0,
});

  document.getElementById("Reset").onclick = function () {
    readFom();
    document.getElementById("velocity").value = 10;
    document.getElementById("lie").value = 1;
    document.getElementById("at").value = 10;
    document.getElementById("spt").value = 10;
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
      });
    firebase
    .database()
    .ref("Output")
    .update({
      Output: 0,
    })
      location.reload();
  };

  document.getElementById("MP").onclick = function Plot_MP(){
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
        });
        
        (async() => {

          let p =  document.getElementById("lie").value;
          let T_s =  document.getElementById("at").value;
          let T_c =  document.getElementById("spt").value;

          T_s = 200 + (T_s-200-(T_s-200)%10);
          T_c = 500 + (T_c-500-(T_c-500)%10);


          const data1 = [];
          const data2 = [];
          const data3 = [];
          const labelsa = [];

          const data4 = [];
          const data5 = [];
          const data6 = [];
          const labelsb = [];

          let k=2;
          
          let url = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data' + p.toString() + T_s.toString() + T_c.toString();
          let workbook = XLSX.read(await (await fetch(url)).arrayBuffer());

          let url1 = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data2' + p.toString() + T_s.toString() + T_c.toString();
          let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
          document.getElementById("Output").innerHTML = workbook1.Sheets.Sheet1["A2"].v
          const name = [workbook.Sheets.Sheet1.A1.v, workbook.Sheets.Sheet1.B1.v, workbook.Sheets.Sheet1.C1.v];


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
            {x: labelsb, y: data6, mode:"lines", name: name[0]}
          ];


        //Define Layout
        var layoutx = { xaxis: {title: "Time (s)"}, yaxis: {title: "mm"}, title: "Melt Width & Melt Depth Prediction"};
        var layoutx1 = { xaxis: {title: "Time (s)"}, yaxis: {title: "mm<sup>2</sup>"}, title: "Melt Area Prediction"};


        // Display using Plotly
        Plotly.newPlot("myPlot", datax, layoutx);
        Plotly.newPlot("myPlot2", datax1, layoutx1);
   
         function data_update(k){
          for(let i = 2; i < k; i++){
   
              const locale1 = "A"+i;
              const locale2 = "B"+i;
              const locale3 = "C"+i;
   
              data1[i-2] = workbook.Sheets.Sheet1[locale1].v.slice(1,workbook.Sheets.Sheet1[locale1].v.length-1);
              data2[i-2] = workbook.Sheets.Sheet1[locale2].v.slice(1,workbook.Sheets.Sheet1[locale2].v.length-1);
              data3[i-2] = workbook.Sheets.Sheet1[locale3].v.slice(1,workbook.Sheets.Sheet1[locale3].v.length-1);
   
              labelsa[i-2] = i-2;   
          }}
   
          // Define Data
          var data = [
            {x: labelsa, y: data1, mode:"lines", name: name[0]},
            {x: labelsa, y: data2, mode:"lines", name: name[1]}
          ];

          var datay = [
            {x: labelsa, y: data3, mode:"lines", name: name[2]}
          ];
   
          // Display using Plotly
          Plotly.newPlot("myPlot1", data, layoutx);
          Plotly.newPlot("myPlot3", datay, layoutx1);
   
         function update(){
           if (k<1978){
            k = k+1
           }

           if (k < 1978){data_update(k);}

           Plotly.animate('myPlot1', {
             data: data
           },
           {layout:{
             xaxis: labelsa
           }},
           {
             transition: {
               duration: 0,
             },
             frame: {
               duration: 0,
               redraw: true
             }
           });

           Plotly.animate('myPlot3', {
            data: datay
          },
          {layout:{
            xaxis: labelsa
          }},
          {
            transition: {
              duration: 0,
            },
            frame: {
              duration: 0,
              redraw: true
            }
          });

           requestAnimationFrame(update);
         }

        requestAnimationFrame(update);
   })();
}


document.getElementById("PP").onclick = function Plot_PP(){
    readFom();
    firebase
      .database()
      .ref("Input")
      .update({
        Velocity: Velocity,
        Laser_input_energy: Laser_input_energy,
        Ambient_temperature: Ambient_temperature,
        Substrate_preheating_temperature: Substrate_preheating_temperature,
        Control: 2,
        control_unity: 1,
        Plot: 2,
      });

      (
        async() => {

          let p1 =  document.getElementById("lie").value;
          let T_s1 =  document.getElementById("at").value;
          let T_c1 =  document.getElementById("spt").value;

          T_s1 = 200 + (T_s1-200-(T_s1-200)%10);
          T_c1 = 500 + (T_c1-500-(T_c1-500)%10);


            const data1 = [];
            const data2 = [];
  
            const data4 = [];
            const data5 = [];
  
            let k=2;
            
            let url = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data1' + p1.toString() + T_s1.toString() + T_c1.toString();
            let workbook = XLSX.read(await (await fetch(url)).arrayBuffer());

            let url1 = 'https://raw.githubusercontent.com/lamtacta2/Data/main/data2' + p1.toString() + T_s1.toString() + T_c1.toString();
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
            document.getElementById("Output").innerHTML = workbook1.Sheets.Sheet1["A2"].v

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

          var layoutx = {xaxis: {title: "Time (s)"}, yaxis: {title: "Temperature (K)"}, title: "Point Prediction"};
  
          // Display using Plotly
          Plotly.newPlot("myPlot", datax, layoutx);
     
           function data_update(k){
            for(let i = 2; i < k; i++){
     
                const locale1 = "A"+i;
                const locale2 = "B"+i;
     
                data1[i-2] = workbook.Sheets.Sheet1[locale1].v.slice(1,workbook.Sheets.Sheet1[locale1].v.length-1);
                data2[i-2] = workbook.Sheets.Sheet1[locale2].v;
  
            }}
     
            // Define Data
            var data = [
              {x: data1, y: data2, mode:"lines", name: "PP"}
            ];
     
            //Define Layout
            var layoutx = {xaxis: {title: "Time (s)"}, yaxis: {title: "Temperature (K)"}, title: "Point Prediction"};
     
            // Display using Plotly
            Plotly.newPlot("myPlot1", data, layoutx);
     
           function update(){
             if (k<1978){
              k = k+1
             }
  
             if (k < 1978){data_update(k);}
             Plotly.animate('myPlot1', {
               data: data
             },
             {layout:{
               xaxis: {range: [data1[k]-100, data1[k]]},
             }},
             {
               transition: {
                 duration: 0,
               },
               frame: {
                 duration: 0,
                 redraw: true,
               }
             });
             requestAnimationFrame(update);
           }
           requestAnimationFrame(update);
     })();
}


