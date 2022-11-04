$(document).ready(function() {
	$.getJSON('https://jsonip.com?callback=?', function (data) {
      $('#ip-address').text(data.ip);
      firebase
      .database()
      .ref("ID")
      .update({ip: data.ip})
      id = data.ip;

firebase
.database()
.ref(data.ip)
.on("value", function (snap) {

  (async() => {

    if (snap.val().control == 1){

    document.getElementById("at").innerHTML = snap.val().at;
    document.getElementById("lie").innerHTML = snap.val().p;  
    document.getElementById("spt").innerHTML = snap.val().spt;
      
    let p = snap.val().p;  
    let T_s = snap.val().at;
    let T_c = snap.val().spt;


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
        const data5 = [];
        const data6 = [];
        const data7 = [];
        const data8 = [];
        const data9 = [];
        const data10 = [];
        const labelsa = [];
        const labelsb = [];
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
        var layoutx3 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool area M<sub>a</sub> [mm<sup>2</sup>]"}, title: "(c) M<sub>a</sub>"};
        var layoutx2 = { xaxis: {title: "Layout number L"}, yaxis: {title: "Melting pool depth M<sub>d</sub> [mm]"}, title: "(b) M<sub>d</sub>"};
        
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
        var datax5 = [{x: labelsb, y: data5, mode:"lines"}];
        var datax6 = [{x: labelsb, y: data6, mode:"lines"}];
        var datax7 = [{x: labelsb, y: data7, mode:"lines"}];
        var datax8 = [{x: labelsb, y: data8, mode:"lines"}];
        var datax9 = [{x: labelsb, y: data9, mode:"lines"}];
  

        Plotly.newPlot("myPlot3", datax4, layoutx4);
        Plotly.newPlot("myPlot4", datax5, layoutx5);
        Plotly.newPlot("myPlot5", datax6, layoutx6);
        Plotly.newPlot("myPlot6", datax7, layoutx7);
        Plotly.newPlot("myPlot7", datax8, layoutx8);
        Plotly.newPlot("myPlot8", datax9, layoutx9);

        Plotly.newPlot("myPlot9", datax1, layoutx1);
        Plotly.newPlot("myPlot10", datax2, layoutx2);
        Plotly.newPlot("myPlot11", datax3, layoutx3);

  }})();
});
})})

